export class TemplateItem {
  id: string;
  name: string;
  parameter_format: string;
  components: TemplateComponent[];
  language: string;
  status: string;
  category: string;
  sub_category: string;
}

export class TemplateComponent {
  type: string;
  text: string;
  example?: string[][];
}

export class Paging {
  cursors: {
    before: string;
    after: string;
  };
}

export class FacebookTemplatesDto {
  data: TemplateItem[];
  paging: Paging;
}
