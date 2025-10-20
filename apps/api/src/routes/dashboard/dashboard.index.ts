import { createRouter } from "../../types.js";
import * as handlers from "./dashboard.handlers.js";
import * as routes from "./dashboard.routes.js";

const router = createRouter()
    // ==================== Dashboard Stats Route ====================
    .openapi(routes.getDashboardStats, handlers.getDashboardStats);

export default router;
