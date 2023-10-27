export interface Reference {
  id: string;
  value: string;
}

export interface NewReference extends Pick<Reference, "value"> {}
