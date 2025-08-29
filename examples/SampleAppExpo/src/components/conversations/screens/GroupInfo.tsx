import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  CometChatAvatar,
  CometChatGroupsEvents,
  CometChatUIEventHandler,
  CometChatConfirmDialog,
  localize,
  useTheme,
  CometChatConversationEvents,
  Icon,
} from "@cometchat/chat-uikit-react-native";
import { CometChat } from "@cometchat/chat-sdk-react-native";
import {
  CometChatUIKit,
  CometChatUiKitConstants,
} from "@cometchat/chat-uikit-react-native";
import { listners } from "../helper/GroupListeners";
import { styles } from "./GroupInfoStyles";
import { leaveGroup } from "../../../utils/helper";
import { CommonUtils } from "../../../utils/CommonUtils";
import ArrowBack from "../../../assets/icons/ArrowBack";
import Group from "../../../assets/icons/Group";
import PersonAdd from "../../../assets/icons/PersonAdd";
import PersonOff from "../../../assets/icons/PersonOff";
import Block from "../../../assets/icons/Block";
import Delete from "../../../assets/icons/Delete";
import { ChatStackParamList } from "../../../navigation/paramLists";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { launchImageLibrary } from "react-native-image-picker";

type GroupInfoProps = {
  route: RouteProp<ChatStackParamList, "GroupInfo">;
  navigation: StackNavigationProp<ChatStackParamList, "GroupInfo">;
};

const GroupInfo: React.FC<GroupInfoProps> = ({ route, navigation }) => {
  const { group, onGroupUpdate } = route.params;
  const theme = useTheme();
  const groupListenerId = useRef("groupListener" + new Date().getTime());

  const [data, setData] = useState({ groupDetails: group });
  const [userScope, setUserScope] = useState(
    group?.getOwner() === CometChatUIKit.loggedInUser?.getUid()
      ? CometChatUiKitConstants.GroupMemberScope.owner
      : group?.getScope()
  );

  // Modal states
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isOwnerLeaveModalOpen, setIsOwnerLeaveModalOpen] = useState(false);
  const [isDeleteExitModalOpen, setIsDeleteExitModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditNameModalOpen, setIsEditNameModalOpen] = useState(false);
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false);

  const [newGroupName, setNewGroupName] = useState(group.getName());
  const [newPassword, setNewPassword] = useState("");
  const [localAvatar, setLocalAvatar] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isSmallDevice = width < 360;

  const handleGroupListener = (updatedGroup: CometChat.Group) => {
    if (updatedGroup.getGuid() === route.params.group.getGuid()) {
      setData({ groupDetails: updatedGroup });
      setUserScope(
        updatedGroup?.getOwner() === CometChatUIKit.loggedInUser?.getUid()
          ? CometChatUiKitConstants.GroupMemberScope.owner
          : updatedGroup?.getScope() ?? userScope
      );
    }
  };

  /** ========== Update Group Name ========== */
  const handleUpdateGroupName = () => {
    if (!newGroupName.trim()) return;

    const groupId = group.getGuid();
    const updatedGroup = new CometChat.Group(groupId);
    updatedGroup.setName(newGroupName);

    CometChat.updateGroup(updatedGroup)
      .then((updated) => {
        setData({ groupDetails: updated });
        handleGroupListener(updated);
        setIsEditNameModalOpen(false);

        // ✅ Tell Messages screen about the update
        if (onGroupUpdate) {
          onGroupUpdate(updated);
        }

        // navigation.goBack();
      })
      .catch((error) => console.log("Group name update failed:", error));
  };

  /** ========== Update Group Password ========== */
  const handleUpdateGroupPassword = () => {
    if (!newPassword.trim()) return;

    const groupId = group.getGuid();
    const updatedGroup = new CometChat.Group(groupId);
    updatedGroup.setType(CometChat.GROUP_TYPE.PASSWORD);
    updatedGroup.setPassword(newPassword);

    CometChat.updateGroup(updatedGroup)
      .then((updated) => {
        setData({ groupDetails: updated });
        handleGroupListener(updated);
        setIsEditPasswordModalOpen(false);

        CometChatUIEventHandler.emitUIEvent("ccGroupUpdated", { group: updated });
      })
      .catch((error) => console.log("Password update failed:", error));
  };

  /** ========== Update Group Avatar ========== */
  const handlePickAvatar = async (groupGuid: string) => {
    try {
      // 1. Ask for permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }

      // 2. Open gallery with expo-image-picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.canceled || !result.assets?.length) return;

      const asset = result.assets[0];
      if (!asset.uri) return;

      const formData = new FormData();
      formData.append("file", {
        uri: asset.uri,
        type: asset.type || "image/jpeg",
        name: asset.fileName || "avatar.jpg",
      } as any);
      
      const res = await fetch("https://stg-mydtonline-232.uw2.rapydapps.cloud/wp-content/themes/mydtonline/templates/testing.php", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await res.json();
      if (!data.url) {
        console.error("Upload failed:", data);
        return;
      }

      const group = new CometChat.Group(groupGuid);
      group.setIcon(data.url);

      CometChat.updateGroup(group).then(
        (updated) => {
          console.log("Group updated successfully");
        },
        (error) => {
          console.error("Group update failed:", error);
        }
      );
    } catch (err) {
      console.error("Error picking avatar:", err);
    }
  };
  /** ========== Group Events ========== */
  useEffect(() => {
    listners.addListener.groupListener({
      groupListenerId: groupListenerId.current,
      handleGroupListener,
    });

    CometChatUIEventHandler.addGroupListener(groupListenerId.current, {
      ccGroupMemberKicked: ({ kickedFrom }: any) => handleGroupListener(CommonUtils.clone(kickedFrom)),
      ccGroupMemberBanned: ({ kickedFrom }: any) => handleGroupListener(CommonUtils.clone(kickedFrom)),
      ccGroupMemberAdded: ({ userAddedIn }: any) => handleGroupListener(CommonUtils.clone(userAddedIn)),
      ccOwnershipChanged: ({ group }: any) => handleGroupListener(group),
    });

    CometChatUIEventHandler.addUIListener(groupListenerId.current, {
      ccGroupUpdated: ({ group }: { group: CometChat.Group }) => handleGroupListener(group),
    } as any);

    return () => {
      listners.removeListner.removeGroupListener({ groupListenerId: groupListenerId.current });
      CometChatUIEventHandler.removeGroupListener(groupListenerId.current);
      CometChat.removeGroupListener(groupListenerId.current);
    };
  }, [group, userScope]);

  /** ========== Labels ========== */
  const getLabel = (key: string) => {
    const label = localize(key);
    if (isSmallDevice && label.split(" ").length === 2) {
      return label.split(" ").join("\n");
    }
    return label;
  };

  /** ========== Confirm Handlers (Leave/Delete/etc) ========== */
  const handleLeaveConfirm = () => {
    setIsLeaveModalOpen(false);
    if (data.groupDetails) {
      leaveGroup(data.groupDetails, navigation, 2);
    }
  };

  const handleOwnerLeaveConfirm = () => {
    if (!data.groupDetails) return;
    setIsOwnerLeaveModalOpen(false);
    navigation.navigate("TransferOwnershipSection", { group: data.groupDetails });
  };

  const handleDeleteExitConfirm = () => {
    setIsDeleteExitModalOpen(false);
    if (!data.groupDetails) return;

    CometChat.deleteGroup(data.groupDetails.getGuid())
      .then(() => navigation.pop(2))
      .catch((error) => console.log("Group deletion failed:", error));

    CometChatUIEventHandler.emitGroupEvent(CometChatGroupsEvents.ccGroupDeleted, {
      group: data.groupDetails,
    });
  };

  const handleDeleteConversationConfirm = () => {
    setDeleteModalOpen(false);
    if (group) {
      CometChat.getConversation(group.getGuid(), "group")
        .then((conversation) => {
          CometChat.deleteConversation(group.getGuid(), "group")
            .then(() => {
              CometChatUIEventHandler.emitConversationEvent(
                CometChatConversationEvents.ccConversationDeleted,
                { conversation }
              );
              navigation.pop(2);
            })
            .catch((error) => console.log("Error while deleting conversation:", error));
        })
        .catch((error) => console.log("Error while deleting conversation:", error));
    }
  };

  return (
    <View style={[styles.flexOne, { backgroundColor: theme.color.background1 }]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
          <Icon icon={<ArrowBack color={theme.color.iconPrimary} height={24} width={24} />} />
        </TouchableOpacity>
        <Text style={[theme.typography.heading1.bold, styles.pL5, { color: theme.color.textPrimary }]}>
          {localize("GROUP_INFO")}
        </Text>
      </View>

      {/* Group Info */}
      <View style={[styles.groupInfoSection, { borderColor: theme.color.borderLight }]}>
        <View style={styles.infoTitleContainer}>
          <CometChatAvatar
            style={{ containerStyle: styles.avatarContainer, textStyle: styles.avatarText, imageStyle: styles.avatarImage }}
            image={
              localAvatar
                ? { uri: localAvatar }
                : data.groupDetails?.getIcon()
                  ? { uri: data.groupDetails?.getIcon() }
                  : undefined
            }
            name={data.groupDetails?.getName() ?? ""}
          />
          <TouchableOpacity
            onPress={() => {
              if (data.groupDetails) handlePickAvatar(data.groupDetails.getGuid());
            }}
            style={{ marginTop: 6 }}
          >
            <Text style={{ color: theme.color.primary }}>{localize("Change Avatar")}</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: "row", marginTop: 4 }}>
            <View style={styles.ellipseTail}>
              <Text
                style={[theme.typography.heading3.medium, styles.titleName, { color: theme.color.textPrimary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {data.groupDetails?.getName()}
              </Text>
            </View>
          </View>
          <Text style={[theme.typography.caption1.medium, styles.boxLabel, { color: theme.color.textSecondary }]}>
            {data.groupDetails?.getMembersCount() +
              " " +
              localize(data.groupDetails?.getMembersCount() === 1 ? "MEMBER" : "MEMBERS")}
          </Text>

          {/* Change Group Name Option */}
          {(userScope === CometChatUiKitConstants.GroupMemberScope.owner ||
            userScope === CometChatUiKitConstants.GroupMemberScope.admin) && (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => {
                  setNewGroupName(data.groupDetails?.getName() ?? "");
                  setIsEditNameModalOpen(true);
                }}
              >
                <Text style={{ color: theme.color.primary }}>{localize("Change Name")}</Text>
              </TouchableOpacity>
            )}

          {/* Change Password Option (only for password groups) */}
          {data.groupDetails?.getType() === CometChat.GROUP_TYPE.PASSWORD &&
            (userScope === CometChatUiKitConstants.GroupMemberScope.owner ||
              userScope === CometChatUiKitConstants.GroupMemberScope.admin) && (
              <TouchableOpacity
                onPress={() => setIsEditPasswordModalOpen(true)}
                style={{ marginTop: 8 }}
              >
                <Text style={{ color: theme.color.primary }}>{localize("Change Password")}</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>

      {/* Actions (Delete, Leave, Delete & Exit) */}
      <View style={styles.actionContainer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => setDeleteModalOpen(true)} style={styles.iconContainer}>
            <Icon icon={<Delete color={theme.color.error} height={24} width={24} />} />
            <Text style={[theme.typography.heading4.regular, styles.mL5, { color: theme.color.error }]}>
              {localize("DELETE_CHAT_TEXT")}
            </Text>
          </TouchableOpacity>
        </View>
        {data.groupDetails.getMembersCount() > 1 ||
          userScope !== CometChatUiKitConstants.GroupMemberScope.owner ? (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              onPress={() =>
                userScope === CometChatUiKitConstants.GroupMemberScope.owner
                  ? setIsOwnerLeaveModalOpen(true)
                  : setIsLeaveModalOpen(true)
              }
              style={styles.iconContainer}
            >
              <Icon icon={<Block color={theme.color.error} height={24} width={24} />} />
              <Text style={[theme.typography.heading4.regular, styles.mL5, { color: theme.color.error }]}>
                {localize("LEAVE")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {[CometChatUiKitConstants.GroupMemberScope.owner, CometChatUiKitConstants.GroupMemberScope.admin].includes(
          userScope
        ) && (
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => setIsDeleteExitModalOpen(true)} style={styles.iconContainer}>
                <Icon icon={<Delete color={theme.color.error} height={24} width={24} />} />
                <Text style={[theme.typography.heading4.regular, styles.mL5, { color: theme.color.error }]}>
                  {localize("DELETE_AND_EXIT")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
      </View>

      {/* Confirm Dialogs */}
      <CometChatConfirmDialog
        isOpen={isLeaveModalOpen}
        onCancel={() => setIsLeaveModalOpen(false)}
        onConfirm={handleLeaveConfirm}
        titleText={localize("LEAVE_GROUP_TEXT")}
        messageText={localize("LEAVE_SURE")}
        cancelButtonText={localize("CANCEL")}
        confirmButtonText={localize("LEAVE")}
        icon={<Block color={theme.color.error} height={45} width={45} />}
      />
      <CometChatConfirmDialog
        isOpen={isOwnerLeaveModalOpen}
        onCancel={() => setIsOwnerLeaveModalOpen(false)}
        onConfirm={handleOwnerLeaveConfirm}
        titleText={localize("TRANSFER_OWNERSHIP")}
        messageText={localize("TRANSFER_SURE")}
        cancelButtonText={localize("CANCEL")}
        confirmButtonText={localize("TRANSFER")}
        icon={<Block color={theme.color.error} height={45} width={45} />}
      />
      <CometChatConfirmDialog
        isOpen={isDeleteExitModalOpen}
        onCancel={() => setIsDeleteExitModalOpen(false)}
        onConfirm={handleDeleteExitConfirm}
        titleText={`${localize("DELETE_AND_EXIT")}?`}
        messageText={localize("DELETE_AND_EXIT_SURE")}
        cancelButtonText={localize("CANCEL")}
        confirmButtonText={localize("DELETE_AND_EXIT")}
        icon={<Delete color={theme.color.error} height={45} width={45} />}
      />
      <CometChatConfirmDialog
        isOpen={isDeleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConversationConfirm}
        titleText={localize("DELETE_CHAT")}
        messageText={localize("SURE_TO_DELETE_CHAT")}
        cancelButtonText={localize("CANCEL")}
        confirmButtonText={localize("DELETE")}
        icon={<Delete color={theme.color.error} height={45} width={45} />}
      />

      {/* Edit Name Modal */}
      {isEditNameModalOpen && (
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{localize("Change Group Name")}</Text>
            <TextInput
              value={newGroupName}
              onChangeText={setNewGroupName}
              style={styles.input}
              placeholder={localize("Group Name")}
              placeholderTextColor={theme.color.textSecondary}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsEditNameModalOpen(false)} style={{ marginRight: 15 }}>
                <Text style={{ color: theme.color.textSecondary }}>{localize("CANCEL")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateGroupName}>
                <Text style={{ color: theme.color.primary }}>{localize("SAVE")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Edit Password Modal */}
      {isEditPasswordModalOpen && (
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{localize("Change Group Password")}</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              style={styles.input}
              placeholder={localize("Enter New Password")}
              placeholderTextColor={theme.color.textSecondary}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsEditPasswordModalOpen(false)} style={{ marginRight: 15 }}>
                <Text style={{ color: theme.color.textSecondary }}>{localize("CANCEL")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUpdateGroupPassword}>
                <Text style={{ color: theme.color.primary }}>{localize("SAVE")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default GroupInfo;
