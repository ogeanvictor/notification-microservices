import { ApiProperty } from '@nestjs/swagger';

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

export class WppTemplatesResponseDto {
  @ApiProperty({
    example: {
      data: [
        {
          name: 'template_01',
          parameter_format: 'POSITIONAL',
          components: [
            {
              type: 'BODY',
              text: 'Olá *{{1}}*, tudo bem ?\n\nTemplate 01',
              example: {
                body_text: [['John Due']],
              },
            },
            {
              type: 'FOOTER',
              text: 'Template01',
            },
          ],
          language: 'pt_BR',
          status: 'APPROVED',
          category: 'UTILITY',
          id: '230491930',
        },
      ],
    },
    description: 'Templates data array',
  })
  data: TemplateItem[];
  @ApiProperty({
    example: {
      paging: {
        cursors: {
          before: 'MAFOP',
          after: 'ANSDF',
        },
      },
    },
    description: 'Templates data array',
  })
  paging: Paging;
}
