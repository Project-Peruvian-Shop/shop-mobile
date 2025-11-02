export const ROUTES = {
  GROUPS: {
    APP: "(app)" as const,
    DASHBOARD: "(dashboard)" as const,
    AUTH: "(auth)" as const,
    LANDING: "(landing)" as const,
    PROFILE: "(profile)" as const,
    STORE: "(store)" as const,
  },

  TABS: {
    HOME: {
      NAME: "Inicio",
      PATH: "(tabs)/index" as const,
      ENTIRE_PATH: "/(app)/(tabs)/index" as const,
    },
    PRODUCTS: {
      NAME: "Productos",
      PATH: "(tabs)/products" as const,
      ENTIRE_PATH: "/(app)/(tabs)/products" as const,
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
    MORE: {
      NAME: "Más",
      PATH: "(tabs)/more" as const,
      ENTIRE_PATH: "/(app)/(tabs)/more" as const,
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

  AUTH: {
    LOGIN: {
      NAME: "Login",
      PATH: "(auth)/login" as const,
      ENTIRE_PATH: "/(auth)/login" as const,
    },
    REGISTER: {
      NAME: "Register",
      PATH: "(auth)/register" as const,
      ENTIRE_PATH: "/(auth)/register" as const,
    },
  },

  LANDING: {
    ABOUT: {
      NAME: "¿?Quiénes somos?",
      PATH: "(landing)/about" as const,
      ENTIRE_PATH: "/(landing)/about" as const,
    },
    CLAIMS: {
      NAME: "Libro de reclamaciones",
      PATH: "(landing)/claims" as const,
      ENTIRE_PATH: "/(landing)/claims" as const,
    },
    CONTACT: {
      NAME: "Contáctanos",
      PATH: "(landing)/contact" as const,
      ENTIRE_PATH: "/(landing)/contact" as const,
    },
    PRIVACY: {
      NAME: "Política de privacidad",
      PATH: "(landing)/privacy" as const,
      ENTIRE_PATH: "/(landing)/privacy" as const,
    },
    FAQ: {
      NAME: "Preguntas frecuentes",
      PATH: "(landing)/faq" as const,
      ENTIRE_PATH: "/(landing)/faq" as const,
    },
    TERMS: {
      NAME: "Términos y condiciones",
      PATH: "(landing)/terms" as const,
      ENTIRE_PATH: "/(landing)/terms" as const,
    },
  },

  PROFILE: {
    COTIZACIONDETAIL: {
      NAME: "Detalle de Cotización",
      PATH: "(profile)/(cotizaciones)/[id]" as const,
      GO: (id: number) => `/(profile)/(cotizaciones)/${id}` as const,
    },
    COTIZACIONES: {
      NAME: "Mis Cotizaciones",
      PATH: "(profile)/cotizaciones" as const,
      ENTIRE_PATH: "/(profile)/cotizaciones" as const,
    },
    PROFILE: {
      NAME: "Mi Perfil",
      PATH: "(profile)/profile" as const,
      ENTIRE_PATH: "/(profile)/profile" as const,
    },
  },

  STORE: {
    COTIZACION: {
      NAME: "Crear Cotización",
      PATH: "(store)/create" as const,
      ENTIRE_PATH: "/(store)/create" as const,
    },
    DETAILPRODUCT: {
      NAME: "Detalle de Producto",
      PATH: "(store)/[id]" as const,
      GO: (id: number) => `/(store)/${id}` as const,
    },
  },
} as const;
