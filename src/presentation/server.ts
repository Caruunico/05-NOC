import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasources";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.implementation";
import { CronService } from "./cron/cron-service";

const fileSystemRepository = new LogRepositoryImpl( 
    new FileSystemDatasource(),
    // new mongoDB() 
)

export class Server {
    public static start() {
        console.log("Server started!!");

        CronService.createJob(
            '*/5 * * * * *', 
            () => {
                const url = 'https://localhost:3000'
                new CheckService(
                    fileSystemRepository,
                    ()=> console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url);
                // new CheckService().execute('http://localhost:3000/posts');
        },);
      
    }
}

