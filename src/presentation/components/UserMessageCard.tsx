import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, IconButton, Text, TouchableRipple } from "react-native-paper";
import { theme } from "@/src/core/constants/theme";
import Animated, {
  LinearTransition,
  ZoomInEasyUp,
  ZoomOutEasyDown,
} from "react-native-reanimated";

interface UserMessageCardProps {
  messageContent: string;
  senderLocation: string;
  onDelete: () => void;
}

const UserMessageCard: React.FC<UserMessageCardProps> = ({
  messageContent,
  senderLocation,
  onDelete,
}) => {
  return (
    <Animated.View
      entering={ZoomInEasyUp}
      exiting={ZoomOutEasyDown}
      layout={LinearTransition}
    >
      <Card style={styles.card}>
        <TouchableRipple
          rippleColor="rgba(0, 0, 0, .32)"
          style={styles.touchable}
        >
          <View>
            <IconButton
              icon="delete-forever"
              size={20}
              onPress={onDelete}
              style={styles.deleteIcon}
            />
            <Card.Content>
              <Text style={styles.senderLocation}>{senderLocation}</Text>
              <Text style={styles.messageContent}>{messageContent}</Text>
            </Card.Content>
          </View>
        </TouchableRipple>
      </Card>
    </Animated.View>
  );
};

export default UserMessageCard;

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 16,
    backgroundColor: theme.card,
  },
  messageContent: {
    fontSize: 14,
    color: theme.title,
    padding: 8,
    textAlign: "center",
    marginBottom: 8,
  },
  senderLocation: {
    fontSize: 9,
    color: theme.textPrimary,
    padding: 8,
    textAlign: "left",
  },
  createdAt: {
    fontSize: 8,
    color: theme.textPrimary,
    padding: 8,
    textAlign: "right",
  },
  deleteIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
  touchable: {
    borderRadius: 16,
  },
});
