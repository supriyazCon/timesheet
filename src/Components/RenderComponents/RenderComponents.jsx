import {
  FormLabel,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Tooltip,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import { COMPONENTS } from '../../Utils/Constants';
import { isArray } from '../../Utils/Utils';

const RenderComponents = ({ payload, metaData, ind, handleChange }) => {
  const {
    TEXT_FIELD,
    SELECT_BOX,
    CHECKBOX,
    RADIO,
    AUTOCOMPLETE,
    DATEPICKER,
    TEXT_AREA,
    MULTI_SELECT_BOX,
    BUTTON,
    TYPOGRAPHY,
    ICON,
    NONE
  } = COMPONENTS;

  const createComponent = () => {
    const {
      control,
      isPasswordField = false,
      variant,
      key,
      showLabel = false,
      label,
      placeholder,
      size,
      options,
      labelStyle,
      controlStyle,
      groupStyle,
      select = false,
      fullWidth = true,
      columnWidth = 1.5,
      inputFormat = 'dd-MM-yyyy',
      views = ['year', 'month', 'day'],
      defaultValue = '',
      maxRows = 10,
      minRows = 4,
      menuProps = {},
      type = 'text',
      btnTitle,
      handleClickButton,
      iconSize,
      isDisabled = metaData.disabled || false,
      isError = metaData.error || false,
      helperText = metaData.helperText || false,
      isRequired = false,
      handleBlur,
      endAdornmentData,
      endAdornmentIcon,
      isMultiline = false,
      textRows,
      tooltipTitle,
      placement,
      iconName,
      iconTitle = '',
      handleClickIcon,
      isSelecteAllAllow = true,
      isEmptyOptionAllowed = false,
      maxCharacterLimit,
      handleKeyDown,
      showTodayButton = true,
      disableFuture = false,
      disablePast = false,
      color,
      startIcon,
      minDate,
      maxDate,
      labelPlacement,
      autoCompleteDisplayKey,
      multiple = true,
      maxMultipleOptions = 100,
      selectAll = false,
      selectAllLabel = 'Select All',
      textTransform,
      payloadStyle,
      name,
      shouldDisableDate,
      displayKey = 'name',
      secondDate,
      secondLabel,
      isSecondDate = false
    } = metaData;

    switch (control) {
      case TEXT_FIELD:
      case SELECT_BOX:
        return (
          <Grid item xs={12} sm={columnWidth} style={{ ...groupStyle }} key={`${key}-${ind}`}>
            {showLabel && <FormLabel style={labelStyle}>[label]</FormLabel>}
            <Tooltip title={tooltipTitle || ''} placement={placement}>
              <TextField
                id={key}
                variant={variant || 'outlined'}
                size={size || 'small'}
                type={isPasswordField ? 'password' : type}
                select={select}
                fullWidth={fullWidth}
                label={(label && [label]) || ''}
                placeholder={(placeholder && [placeholder]) || ''}
                // SelectProps={{ native: true }}
                onChange={(e) => handleChange(key, e.target.value, ind)}
                onBlur={(e) => handleBlur && handleBlur(key, e.target.value, ind)}
                // onKeyDown={(e) => keyDownHandler(e)}
                value={(payload && payload[key]) || ''}
                style={{ ...controlStyle }}
                disabled={isDisabled}
                error={isError}
                helperText={isError && helperText}
                required={isRequired}
                autoComplete="off"
                // onInput={(e) => {
                //   e.target.value = getCharacters(e.target.value);
                // }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {endAdornmentData && <span style={{ fontSize: '0.8rem' }}>{endAdornmentData}</span>}
                      {endAdornmentIcon && <span>{endAdornmentIcon}</span>}
                    </InputAdornment>
                  )
                }}
                multiline={isMultiline}
                rows={textRows}
              // InputLabelProps={{ shrink: (payload && payload[key]) || false }}
              >
                {isEmptyOptionAllowed && <MenuItem key={key} value="" />}
                {isSelecteAllAllow && (
                  <MenuItem key={key} value="all">
                    --
                  </MenuItem>
                )}
                {isArray(options) &&
                  options.map((item) => (
                    <MenuItem style={{ fontSize: '0.8rem' }} key={item.id} disabled={item.isDisabled} value={item.id}>
                      {item[displayKey]}
                    </MenuItem>
                  ))}
              </TextField>
            </Tooltip>
          </Grid>
        );
      case TYPOGRAPHY:
        return (
          <Grid item xs={12} sm={columnWidth} style={{ ...groupStyle }} key={`${key}-${ind}`}>
            <Grid style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Typography variant="subtitle2" style={{ ...labelStyle, fontSize: '1rem' }}>
                {label || ''}
              </Typography>
              {isRequired && (
                <Typography variant="subtitle2" color="error">
                  *
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      case BUTTON:
        return (
          <Grid item xs={12} sm={columnWidth} style={{ ...groupStyle }} key={`${key}-${ind}`}>
            <Tooltip title={tooltipTitle || ''}>
              <Button
                disabled={isDisabled}
                // fullWidth={fullWidth}
                size="small"
                variant="contained"
                name={name || ''}
                // sx={{
                //   borderRadius: 28,
                //   ':hover': {
                //     bgcolor: color === 'success' ? 'primary.main' : 'warning.main',
                //     color: 'white'
                //   },
                //   textTransform
                // }}
                onClick={handleClickButton}
                color={color}
                startIcon={startIcon}
              >
                {btnTitle}
              </Button>
            </Tooltip>
          </Grid>
        );
      case ICON:
        return (
          <>
            <Tooltip title={tooltipTitle || ''} placement={placement}>
              <IconButton
                onClick={() => handleClickIcon(key, ind)}
                aria-label={tooltipTitle || ''}
                style={{ ...groupStyle }}
                color={color || 'inherit'}
                disabled={isDisabled}
                size={iconSize}
              >
                {iconName} <Typography variant="subtitle2">{iconTitle}</Typography>
              </IconButton>
            </Tooltip>
            {label && <Typography variant="subtitle2">{label}</Typography>}
          </>
        );
      default:
        return '';
    }
  };
  return createComponent();
};

export default RenderComponents;
