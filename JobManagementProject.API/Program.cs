using JobManagementProject.API.Data;
using JobManagementProject.API.Mappings;
using JobManagementProject.API.Models.Domain;
using JobManagementProject.API.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Serilog;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File("Logs/JobTimeSheet_Log.txt", rollingInterval: RollingInterval.Day)
    .MinimumLevel.Warning()
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Job Management API", Version = "v1" });
    options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
    {
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = JwtBearerDefaults.AuthenticationScheme
    });


    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                },
                Scheme = "Oauth2",
                Name = JwtBearerDefaults.AuthenticationScheme,
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});

builder.Services.AddDbContext<JobDbContext>(Options =>
Options.UseSqlServer(builder.Configuration.GetConnectionString("JobManagementConnectionString")));
/*builder.Services.AddDbContext<JobAuthDbContext>(Options =>
Options.UseSqlServer(builder.Configuration.GetConnectionString("JobManagementAuthConnectionString")));*/


builder.Services.AddScoped<IUsersRepository, SQLUsersRepository>();
builder.Services.AddScoped<ITimeSheetRepository, SQLTimeSheetRepository>();
builder.Services.AddScoped<ITaskRepository, SQLTaskRepository>();
builder.Services.AddScoped<IClientRepository, SQLClientRepository>();
builder.Services.AddScoped<IProjectRepository, SQLProjectRepository>();
builder.Services.AddScoped<ITokenRepository, TokenRepository>();
//builder.Services.AddScoped<ICurrencyRepository, SQLCurrencyRepository>();



builder.Services.AddAutoMapper(typeof(AutoMapperProfiles));



builder.Services.AddIdentityCore<IdentityUser>()
    .AddRoles<IdentityRole>()
    .AddTokenProvider<DataProtectorTokenProvider<IdentityUser>>("JobManagement")
    .AddEntityFrameworkStores<JobDbContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
    options.Password.RequiredUniqueChars = 1;
});


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(Options =>
    Options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    });


 void Configure(IApplicationBuilder app, IWebHostEnvironment env, JobDbContext dbContext)
{
    // Other middleware configurations

    // Seed initial data for currencies
    if (!dbContext.Currencies.Any())
    {
        SeedCurrencies(dbContext);
    }
}

 void SeedCurrencies(JobDbContext dbContext)
{
    var currencies = new List<Currency>
    {
        new Currency { CurrencyCode = "USD", CurrencyId = 100},
        new Currency { CurrencyCode = "EUR", CurrencyId = 200},
        new Currency { CurrencyCode = "JPY", CurrencyId = 300},
        // Add more currencies as needed
    };

    dbContext.Currencies.AddRange(currencies);
    dbContext.SaveChanges();
}





// CORS
var myOrigins = "myOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: myOrigins,
        policy =>
        {
            policy.WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });

});



//Middleware 

var app = builder.Build();

if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseMiddleware<ExceptionHandlerMiddleware>();

app.UseHttpsRedirection();

app.UseCors(myOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
