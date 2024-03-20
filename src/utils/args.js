import { Command } from 'commander'

const args = new Command()

args.option("-p <port>", "Define the port")

args.option("--env <env>", "Define the environment", "prod")

args.parse()

export default args.opts()