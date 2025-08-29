import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<any>();

interface PendingNavigation {
  name: keyof any;
  params?: any;
}

let pendingNavigation: PendingNavigation | null = null;

export function navigate<RouteName extends keyof any>(
  name: RouteName,
  params?: any[RouteName] extends undefined ? undefined : any[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  } else {
    pendingNavigation = { name, params };
  }
}

export function processPendingNavigation() {
  if (pendingNavigation && navigationRef.isReady()) {
    const { name, params } = pendingNavigation;
    navigationRef.navigate(name as any, params as any);
    pendingNavigation = null;
  }
}
