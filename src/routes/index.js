import ApiRouter from "./apis/index.js"
import ViewsRouter from './views/index.js'
import CustomRouter from "./CustomRouter.js";

const api = new ApiRouter()
const views = new ViewsRouter()

export default class IndexRouter extends CustomRouter {
    init() {
        this.Use("/api", api.GetRouter())
        this.Use("/", views.GetRouter())
    }
}