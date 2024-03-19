import { Command } from 'commander'

const args = new Command()

args.option("--port", "-p", "Define the port", process.env.PORT, 9999)

args.option("--env", "-e", "Define the environment", process.env.ENV, "dev")

args.parse()

export default args.opts()