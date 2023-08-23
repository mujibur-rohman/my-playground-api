import { PORT, app } from "./app";
import { logger } from "./utils/logger";

app.listen(PORT, () => logger.info("Server is listening on PORT " + PORT));
