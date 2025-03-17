import Express from "express";
import { moveCursorToLine } from "./cursor_handler";
import { handleInstruction } from "./controllers";

type Commands = 'cursorToLine';

type Value = Partial<number | string>;


export interface Instructions {
  date: Date;
  command: Commands;
  value?: Value;
}


export function startServer(port: number = 3000) {
    const app = Express();
  
    app.use(Express.json());
    app.use(Express.urlencoded({ extended: true }));

    app.post('/instructions', (req: Express.Request<undefined, undefined, Instructions>, res: Express.Response) => {
      console.log(req.body)
      handleInstruction(req.body)
      res.json({ success: true });
    });
  
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }
  