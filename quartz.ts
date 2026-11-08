import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { LocalCustomTransformer } from "./quartz/plugins/transformers/timeline"

const config = await loadQuartzConfig()

config.plugins.transformers.push(LocalCustomTransformer())

export default config
export const layout = await loadQuartzLayout()