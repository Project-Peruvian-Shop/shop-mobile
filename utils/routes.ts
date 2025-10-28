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
    PRINCIPAL: {
      NAME: "Principal",
      PATH: "(principal)/index" as const,
      ENTIRE_PATH: "/(principal)" as const,
    },

    PRODUCTS: {
      ALL: {
        NAME: "Productos",
        PATH: "(products)/index" as const,
        ENTIRE_PATH: "/(products)" as const,
      },
      DETAIL: {
        NAME: "Producto",
        PATH: "(dashboard)/(products)/[id]" as const,
        GO: (id: number) => `/(dashboard)/(products)/${id}` as const,
      },
    },

    CATEGORIES: {
      ALL: {
        NAME: "Categorías",
        PATH: "(categories)/index" as const,
        ENTIRE_PATH: "/(categories)" as const,
      },
      DETAIL: {
        NAME: "Categoría",
        PATH: "(dashboard)/(categories)/[id]" as const,
        GO: (id: number) => `/(dashboard)/(categories)/${id}` as const,
      },
    },

    COTIZACIONES: {
      ALL: {
        NAME: "Cotizaciones",
        PATH: "(cotizaciones)/index" as const,
        ENTIRE_PATH: "/(cotizaciones)" as const,
      },
      DETAIL: {
        NAME: "Cotización",
        PATH: "(dashboard)/(cotizaciones)/[id]" as const,
        GO: (id: number) => `/(dashboard)/(cotizaciones)/${id}` as const,
      },
    },

    USERS: {
      ALL: {
        NAME: "Usuarios",
        PATH: "(users)/index" as const,
        ENTIRE_PATH: "/(users)" as const,
      },
      DETAIL: {
        NAME: "Usuario",
        PATH: "(dashboard)/(users)/[id]" as const,
        GO: (id: number) => `/(dashboard)/(users)/${id}` as const,
      },
    },

    MESSAGES: {
      ALL: {
        NAME: "Mensajes",
        PATH: "(messages)/index" as const,
        ENTIRE_PATH: "/(messages)" as const,
      },
      DETAIL: {
        NAME: "Mensaje",
        PATH: "(dashboard)/(messages)/[id]" as const,
        GO: (id: number) => `/(dashboard)/(messages)/${id}` as const,
      },
    },
  },
} as const;
