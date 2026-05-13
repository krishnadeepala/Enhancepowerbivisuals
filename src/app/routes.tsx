import React from "react";
import { createMemoryRouter, Navigate } from "react-router";
import { GENELayout } from "./components/GENELayout";
import GENEOverview from "./pages/GENEOverview";
import UserEngagement from "./pages/UserEngagement";
import FeatureUsage from "./pages/FeatureUsage";
import UserJourney from "./pages/UserJourney";
import Retention from "./pages/Retention";
import Funnels from "./pages/Funnels";
import CohortAnalysis from "./pages/CohortAnalysis";
import Reports from "./pages/Reports";
import AMSDDashboard from "./pages/AMSDDashboard";
import InventoryCompleteness from "./pages/InventoryCompleteness";

export const router = createMemoryRouter(
  [
    // Standalone pages (own layout, no GENELayout wrapper)
    { path: "/amsd",                   Component: AMSDDashboard         },
    { path: "/inventory-completeness", Component: InventoryCompleteness },
    // GENE Analytics — uses GENELayout sidebar/header
    {
      Component: GENELayout,
      children: [
        { path: "/",                Component: GENEOverview   },
        { path: "/user-engagement", Component: UserEngagement },
        { path: "/feature-usage",   Component: FeatureUsage   },
        { path: "/user-journey",    Component: UserJourney    },
        { path: "/retention",       Component: Retention      },
        { path: "/funnels",         Component: Funnels        },
        { path: "/cohort-analysis", Component: CohortAnalysis },
        { path: "/reports",         Component: Reports        },
        { path: "*",                element: <Navigate to="/" replace /> },
      ],
    },
  ],
  {
    initialEntries: ["/"],
    initialIndex: 0,
  }
);