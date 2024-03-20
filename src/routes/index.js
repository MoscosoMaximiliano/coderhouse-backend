import ApiRouter from "./apis/index.js"
import ViewsRouter from './views/index.js'
import CustomRouter from "./CustomRouter.js";

const views = new ViewsRouter();
const viewsRouter = views.getRouter();

class IndexRouter extends CustomRouter {
    init() {
        this.router.use("/api", ApiRouter)
        this.router.use("/", viewsRouter)
    }
}

const router = new IndexRouter()
export default router.getRouter()