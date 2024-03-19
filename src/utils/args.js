import { Command } from 'commander'

const args = new Command()

args.options("--port", "-p", "Define the port", process.env.PORT, 9999)

args.options("--env", "-e", "Define the environment", process.env.ENV, "dev")

args.parse()

export default args.opts()