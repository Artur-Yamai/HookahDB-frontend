export class TobaccoClass {
  name: string;
  fabricator: string;
  description: string;
  id?: string;
  photoUrl?: string;
  userId?: string;

  constructor({
    name = "",
    fabricator = "",
    description = "",
    id,
    photoUrl,
    userId,
  }: TobaccoClass) {
    this.name = name;
    this.fabricator = fabricator;
    this.description = description;
    this.id = id;
    this.photoUrl = photoUrl;
    this.userId = userId;
  }
}
