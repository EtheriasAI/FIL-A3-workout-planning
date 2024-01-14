import { Command } from 'commander';
import { LRPServer } from './server.js';

// export const generate = async (fileName: string, opts: GenerateOptions): Promise<void> => {
//     const services = createWorkoutPlanningServices(NodeFileSystem).WorkoutPlanning;
//     const model = await extractAstNode<Model>(fileName, services);
//     const generatedFilePath = generateWorkoutPlan(model, fileName, opts.destination);
//     console.log(chalk.green(`Text file generated successfully: ${generatedFilePath}`));
// };

export type GenerateOptions = {
    destination?: string;
}

export default function(): void {
    const program = new Command();

    // const fileExtensions = WorkoutPlanningLanguageMetaData.fileExtensions.join(', ');
    
    // program
    //     .version('0.0.1')
    //     .command('generate')
    //     .option('-d, --destination <dir>', 'destination directory of generating')
    //     .argument('<file>', `source file (possible file extensions: ${fileExtensions})`)
    //     .action(generate);

    program
        .version('0.0.1')
        .command("run")
        .description("Run a server at a specific port")
        .argument("<number>", "port")
        .action(async (port: number) => {
          const server = new LRPServer();
          server.start(port);
    
          //wait for server to start
          await new Promise<void>((resolve) =>
            setTimeout(() => {
              resolve();
            }, 2000)
          );
        });

    program.parse(process.argv);
}
