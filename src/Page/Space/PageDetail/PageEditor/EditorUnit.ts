import { v4 as uuidv4 } from 'uuid';

export class EditorUnit {
  private id: string;
  private content = '';
  private isNew: boolean;

  constructor(isNew: boolean = false) {
    this.id = uuidv4();
    this.isNew = isNew;
  }

  public getId() {
    return this.id;
  }

  public getContent() {
    return this.content;
  }

  public setContent(content: string) {
    return (this.content = content);
  }

  public getIsNew() {
    return this.isNew;
  }
}
