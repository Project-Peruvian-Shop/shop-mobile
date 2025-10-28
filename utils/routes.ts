export const ROUTES = {
  GROUPS: {
    APP: "(app)" as const,
    DASHBOARD: "(dashboard)" as const,
  },

  TABS: {
    HOME: {
      NAME: "Inicio",
      PATH: "(tabs)/index" as const,
      ENTIRE_PATH: "/(app)/(tabs)/index" as const,
    },
    CART: {
      NAME: "Carrito",
      PATH: "(tabs)/cart" as const,
      ENTIRE_PATH: "/(app)/(tabs)/cart" as const,
    },
    DASHBOARD: {
      NAME: "Dashboard",
      PATH: "(tabs)/dashboard" as const,
      ENTIRE_PATH: "/(app)/(tabs)/dashboard" as const,
    },
    PROFILE: {
      NAME: "Perfil",
      PATH: "(tabs)/profile" as const,
      ENTIRE_PATH: "/(app)/(tabs)/profile" as const,
    },
  },

  DASHBOARD: {
    PRODUCTS: {
      NAME: "Productos",
      PATH: "(dashboard)/(products)" as const,
      ENTIRE_PATH: "/(dashboard)/(products)" as const,
    },
    USERS: {
      NAME: "Usuarios",
      PATH: "(dashboard)/(users)" as const,
      ENTIRE_PATH: "/(dashboard)/(users)" as const,
    },
    CATEGORIES: {
      NAME: "Categorías",
      PATH: "(dashboard)/(categories)" as const,
      ENTIRE_PATH: "/(dashboard)/(categories)" as const,
    },
  },
} as const;
