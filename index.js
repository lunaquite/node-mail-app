import TemplateFactory from './TemplateFactory'
import Transporter from './Transporter'
export default ($config) => new Transporter($config, new TemplateFactory($config))
