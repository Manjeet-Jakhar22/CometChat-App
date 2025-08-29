import { CallingExtension } from "../../calls";
import { ExtensionsDataSource } from "../framework";

export type UIKitSettings = {
  appId: string;
  region: string;
  authKey?: string;
  subscriptionType?: "NONE" | "ALL_USERS" | "ROLES" | "FRIENDS";
  autoEstablishSocketConnection?: boolean;
  overrideAdminHost?: string;
  overrideClientHost?: string;
  deviceToken?: string;
  googleApiKey?: string;
  disableCalling?: boolean;
  extensions?: ExtensionsDataSource[];
  roles?: string[];
  callingExtension?: CallingExtension;
};

export function UIKitSettings({
  appId = "xxxxxxxxxx",
  region = "xx",
  authKey = "xxxxxxxxxxxxxxxxxxxxx",
  subscriptionType,
  autoEstablishSocketConnection,
  overrideAdminHost,
  overrideClientHost,
  deviceToken,
  googleApiKey,
  disableCalling,
  extensions,
  roles,
  callingExtension,
}: UIKitSettings): UIKitSettings {
  return {
    appId,
    region,
    authKey,
    subscriptionType,
    autoEstablishSocketConnection,
    overrideAdminHost,
    overrideClientHost,
    deviceToken,
    googleApiKey,
    disableCalling,
    extensions,
    roles,
    callingExtension,
  };
}
