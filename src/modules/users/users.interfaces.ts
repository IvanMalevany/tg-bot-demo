export interface UserCreationAttrs {
  tgId: number;
  name: string;
}

export interface UserAttrs extends UserCreationAttrs {
  id: string;
  createdAt: Date;
}
