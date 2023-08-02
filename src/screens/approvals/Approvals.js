import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
const Approvals = () => {
  const [isPending, setIsPending] = useState(true);
  const [isApproved, setIsApproved] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  const pendingClicked = () => {
    setIsPending(true);
    setIsApproved(false);
    setIsRejected(false);
  };
  const approvedClicked = () => {
    setIsPending(false);
    setIsApproved(true);
    setIsRejected(false);
  };
  const rejectedClicked = () => {
    setIsPending(false);
    setIsApproved(false);
    setIsRejected(true);
  };

  const renderStackButton = () => {
    return (
      <View style={styles.renderStackButtonStyle}>
        <TouchableOpacity
          style={
            isPending ? styles.activeButtonStyle : styles.inactiveButtonStyle
          }
          onPress={() => pendingClicked()}
        >
          {isPending ? (
              <View>
                <Text
                  style={
                    isPending
                      ? styles.activeTextStyle
                      : styles.inactiveTextStyle
                  }
                >
                  PENDING
                </Text>
              </View>
          ) : (
            <View style={{ opacity: 0.5 }}>
              <Text
                style={
                  isPending ? styles.activeTextStyle : styles.inactiveTextStyle
                }
              >
                PENDING
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={
            isApproved
              ? styles.activeButtonStyle
              : styles.inactiveButtonStyle
          }
          onPress={() => approvedClicked()}
        >
          {isApproved ? (
              <View>
                <Text
                  style={
                    isApproved
                      ? styles.activeTextStyle
                      : styles.inactiveTextStyle
                  }
                >
                  APPROVED
                </Text>
              </View>
          ) : (
            <View style={{ opacity: 0.5 }}>
              <Text
                style={
                  isApproved
                    ? styles.activeTextStyle
                    : styles.inactiveTextStyle
                }
              >
                APPROVED
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={
            isRejected ? styles.activeButtonStyle : styles.inactiveButtonStyle
          }
          onPress={() => rejectedClicked()}
        >
          {isRejected ? (
              <View>
                <Text
                  style={
                    isRejected
                      ? styles.activeTextStyle
                      : styles.inactiveTextStyle
                  }
                >
                  REJECTED
                </Text>
              </View>
          ) : (
            <View style={{ opacity: 0.5 }}>
              <Text
                style={
                  isRejected ? styles.activeTextStyle : styles.inactiveTextStyle
                }
              >
                REJECTED
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderPendingContainer = () => {
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.list}>No Records Found</Text>
        <Text style={[styles.details, { textAlign: "center" }]}>
          There are no records to {"\n"} display right now.
        </Text>
      </View>
    );
  };
  const renderApprovedContainer = () => {
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.list}>No Records Found</Text>
        <Text style={[styles.details, { textAlign: "center" }]}>
          There are no records to {"\n"} display right now.
        </Text>
      </View>
    );
  };
  const renderRejectedContainer = () => {
    return (
      <View style={styles.innerContainer}> 
        <Text style={styles.list}>No Records Found</Text>
        <Text style={[styles.details, { textAlign: "center" }]}>
          There are no records to {"\n"} display right now.
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderStackButton()}
      {isPending && renderPendingContainer()}
      {isApproved && renderApprovedContainer()}
      {isRejected && renderRejectedContainer()}
    </View>
  );
};

export default Approvals;
