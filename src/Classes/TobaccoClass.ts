export class TobaccoClass {
  name: string;
  fabricator: string;
  description: string;
  _id?: string;
  photoUrl?: string;
  userId?: string;

  constructor({
    name = "",
    fabricator = "",
    description = "",
    _id,
    photoUrl,
    userId,
  }: TobaccoClass) {
    this.name = name;
    this.fabricator = fabricator;
    this.description = description;
    this._id = _id;
    this.photoUrl = photoUrl;
    this.userId = userId;
  }
}
