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
      ALL: {
        NAME: "Productos",
        PATH: "(dashboard)/(products)" as const,
        ENTIRE_PATH: "/(dashboard)/(products)" as const,
      },
      DETAIL: {
        NAME: "Producto",
        PATH: "(dashboard)/(products)/detail" as const,
        ENTIRE_PATH: "/(dashboard)/(products)/detail" as const,
      },
    },

    CATEGORIES: {
      ALL: {
        NAME: "Categorías",
        PATH: "(dashboard)/(categories)" as const,
        ENTIRE_PATH: "/(dashboard)/(categories)" as const,
      },
      DETAIL: {
        NAME: "Categoría",
        PATH: "(dashboard)/(categories)/detail" as const,
        ENTIRE_PATH: "/(dashboard)/(categories)/detail" as const,
      },
    },

    COTIZACIONES: {
      ALL: {
        NAME: "Cotizaciones",
        PATH: "(dashboard)/(cotizaciones)" as const,
        ENTIRE_PATH: "/(dashboard)/(cotizaciones)" as const,
      },
      DETAIL: {
        NAME: "Cotización",
        PATH: "(dashboard)/(cotizaciones)/detail" as const,
        ENTIRE_PATH: "/(dashboard)/(cotizaciones)/detail" as const,
      },
    },

    USERS: {
      ALL: {
        NAME: "Usuarios",
        PATH: "(dashboard)/(users)" as const,
        ENTIRE_PATH: "/(dashboard)/(users)" as const,
      },
      DETAIL: {
        NAME: "Usuario",
        PATH: "(dashboard)/(users)/detail" as const,
        ENTIRE_PATH: "/(dashboard)/(users)/detail" as const,
      },
    },

    MESSAGES: {
      ALL: {
        NAME: "Mensajes",
        PATH: "(dashboard)/(messages)" as const,
        ENTIRE_PATH: "/(dashboard)/(messages)" as const,
      },
      DETAIL: {
        NAME: "Mensaje",
        PATH: "(dashboard)/(messages)/detail" as const,
        ENTIRE_PATH: "/(dashboard)/(messages)/detail" as const,
      },
    },
  },
} as const;
