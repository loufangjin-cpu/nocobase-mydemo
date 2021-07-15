import React from 'react';
import { SchemaRenderer } from '../..';
import { Table } from '../';
import { uid } from '@formily/shared';
import { createForm } from '@formily/core';
import { ISchema, observer } from '@formily/react';

function useAction() {
  return {
    async run() {
      alert('自定义')
    }
  }
}

const schema: ISchema = {
  name: `table_${uid()}`,
  type: 'array',
  'x-component': 'Table',
  // default: [
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  //   { key: uid(), field1: uid(), field2: uid() },
  // ],
  'x-component-props': {
    rowKey: 'key',
    // isRemoteDataSource: true,
  },
  properties: {
    [`action_bar_${uid()}`]: {
      type: 'void',
      'x-component': 'Table.ActionBar',
      properties: {
        action1: {
          type: 'void',
          name: 'action1',
          title: '筛选',
          'x-component': 'Action',
          properties: {
            popover1: {
              type: 'void',
              title: '弹窗标题',
              'x-decorator': 'Form',
              'x-component': 'Action.Popover',
              'x-component-props': {},
              properties: {
                filter: {
                  name: 'filter',
                  type: 'object',
                  'x-component': 'Filter',
                  properties: {
                    column1: {
                      type: 'void',
                      title: '字段1',
                      'x-component': 'Filter.Column',
                      'x-component-props': {
                        operations: [
                          { label: '等于', value: 'eq' },
                          { label: '不等于', value: 'ne' },
                        ],
                      },
                      properties: {
                        field1: {
                          type: 'string',
                          'x-component': 'Input',
                        },
                      },
                    },
                    column2: {
                      type: 'void',
                      title: '字段2',
                      'x-component': 'Filter.Column',
                      'x-component-props': {
                        operations: [
                          { label: '大于', value: 'gt' },
                          { label: '小于', value: 'lt' },
                          { label: '非空', value: 'notNull', noValue: true },
                        ],
                      },
                      properties: {
                        field1: {
                          type: 'number',
                          'x-component': 'InputNumber',
                        },
                      },
                    },
                  }
                }
              },
            },
          },
        },
        action2: {
          type: 'void',
          name: 'action1',
          title: '新增',
          'x-component': 'Action',
          'x-designable-bar': 'Action.DesignableBar',
          properties: {
            drawer1: {
              type: 'void',
              title: '抽屉标题',
              'x-component': 'Action.Modal',
              'x-component-props': {},
              properties: {
                [uid()]: {
                  name: 'form',
                  type: 'object',
                  'x-component': 'Form',
                  properties: {
                    field1: {
                      type: 'string',
                      title: '字段1',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                    field2: {
                      type: 'string',
                      title: '字段2',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                    action: {
                      type: 'void',
                      title: '提交',
                      'x-component': 'Action',
                      'x-component-props': {
                        useAction: '{{ Table.useTableCreateAction }}',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        action3: {
          type: 'void',
          name: 'action1',
          title: '删除',
          'x-component': 'Action',
          'x-component-props': {
            useAction: '{{ Table.useTableDestroyAction }}',
          },
        },
      },
    },
    // [`a_${uid()}`]: {
    //   type: 'void',
    //   'x-component': 'Table.ActionBar',
    //   'x-component-props': {
    //     align: 'bottom',
    //   },
    //   properties: {
    //     pagination: {
    //       type: 'void',
    //       'x-component': 'Table.Pagination',
    //       'x-component-props': {
    //         defaultPageSize: 5,
    //       },
    //     },
    //   },
    // },
    [`a_${uid()}`]: {
      type: 'void',
      'x-component': 'Table.ActionBar',
      'x-component-props': {
        align: 'bottom',
      },
      properties: {
        pagination: {
          type: 'void',
          title: '新增',
          'x-component': 'Table.Addition',
          'x-component-props': {},
        },
      },
    },
    [`column_${uid()}`]: {
      type: 'void',
      title: '排序',
      'x-component': 'Table.Column',
      properties: {
        sort: {
          type: 'void',
          'x-component': 'Table.SortHandle',
        },
      },
    },
    [`column_${uid()}`]: {
      type: 'void',
      title: '序号',
      'x-component': 'Table.Column',
      properties: {
        index: {
          type: 'void',
          'x-component': 'Table.Index',
        },
      },
    },
    [`column_${uid()}`]: {
      type: 'void',
      title: '字段1',
      'x-component': 'Table.Column',
      'x-component-props': {
        // title: 'z1',
      },
      'x-designable-bar': 'Table.Column.DesignableBar',
      properties: {
        field1: {
          type: 'string',
          required: true,
          'x-read-pretty': true,
          'x-decorator-props': {
            feedbackLayout: 'popover',
          },
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    [`column_${uid()}`]: {
      type: 'void',
      title: '字段2',
      'x-component': 'Table.Column',
      'x-designable-bar': 'Table.Column.DesignableBar',
      properties: {
        field2: {
          type: 'string',
          // title: '字段2',
          required: true,
          'x-read-pretty': true,
          'x-decorator-props': {
            feedbackLayout: 'popover',
          },
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
    [`column_${uid()}`]: {
      type: 'void',
      title: '操作',
      'x-component': 'Table.Column',
      properties: {
        [uid()]: {
          type: 'void',
          name: 'action1',
          title: '查看',
          
          'x-component': 'Action',
          'x-designable-bar': 'Table.Action.DesignableBar',
          properties: {
            drawer1: {
              type: 'void',
              title: '查看',
              'x-component': 'Action.Modal',
              'x-component-props': {},
              properties: {
                [uid()]: {
                  type: 'void',
                  'x-component': 'Tabs',
                  properties: {
                    tab1: {
                      type: 'void',
                      'x-component': 'Tabs.TabPane',
                      'x-component-props': {
                        tab: 'Tab1',
                      },
                      properties: {
                        aaa: {
                          type: 'string',
                          title: 'AAA',
                          'x-decorator': 'FormItem',
                          required: true,
                          'x-component': 'Input',
                        },
                      },
                    },
                    tab2: {
                      type: 'void',
                      'x-component': 'Tabs.TabPane',
                      'x-component-props': {
                        tab: 'Tab2',
                      },
                      properties: {
                        bbb: {
                          type: 'string',
                          title: 'BBB',
                          'x-decorator': 'FormItem',
                          required: true,
                          'x-component': 'Input',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        [uid()]: {
          type: 'void',
          name: 'action1',
          title: '修改',
          'x-component': 'Action',
          'x-designable-bar': 'Table.Action.DesignableBar',
          properties: {
            drawer1: {
              type: 'void',
              title: '编辑表单',
              'x-component': 'Action.Modal',
              'x-component-props': {},
              properties: {
                [uid()]: {
                  name: 'form',
                  type: 'void',
                  'x-component': 'Form',
                  'x-component-props': {
                    useValues: '{{ Table.useTableRow }}',
                  },
                  properties: {
                    field1: {
                      type: 'string',
                      title: '字段1',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                    field2: {
                      type: 'string',
                      title: '字段2',
                      'x-decorator': 'FormItem',
                      'x-component': 'Input',
                    },
                    action: {
                      type: 'void',
                      title: '提交',
                      'x-component': 'Action',
                      'x-component-props': {
                        useAction: '{{ Table.useTableUpdateAction }}',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        [uid()]: {
          type: 'void',
          title: '删除',
          'x-component': 'Action',
          'x-component-props': {
            useAction: '{{ Table.useTableDestroyAction }}',
          },
        },
        [uid()]: {
          type: 'void',
          title: '...',
          'x-component': 'Action.Dropdown',
          properties: {
            [uid()]: {
              type: 'void',
              title: '操作 1',
              'x-component': 'Action',
              'x-component-props': {
                useAction,
                disabled: true,
              },
            },
            [uid()]: {
              type: 'void',
              title: '操作 2',
              'x-component': 'Action',
              'x-default-action': true,
              'x-component-props': {
                useAction,
              },
            },
            [uid()]: {
              type: 'void',
              name: 'action1',
              title: '查看',
              'x-component': 'Action',
              // 'x-default-action': true,
              'x-designable-bar': 'Table.Action.DesignableBar',
              properties: {
                drawer1: {
                  type: 'void',
                  title: '查看',
                  'x-component': 'Action.Modal',
                  'x-component-props': {},
                  properties: {
                    [uid()]: {
                      type: 'void',
                      'x-component': 'Tabs',
                      properties: {
                        tab1: {
                          type: 'void',
                          'x-component': 'Tabs.TabPane',
                          'x-component-props': {
                            tab: 'Tab1',
                          },
                          properties: {
                            aaa: {
                              type: 'string',
                              title: 'AAA',
                              'x-decorator': 'FormItem',
                              required: true,
                              'x-component': 'Input',
                            },
                          },
                        },
                        tab2: {
                          type: 'void',
                          'x-component': 'Tabs.TabPane',
                          'x-component-props': {
                            tab: 'Tab2',
                          },
                          properties: {
                            bbb: {
                              type: 'string',
                              title: 'BBB',
                              'x-decorator': 'FormItem',
                              required: true,
                              'x-component': 'Input',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            [uid()]: {
              type: 'void',
              name: 'action1',
              title: '修改',
              'x-component': 'Action',
              'x-designable-bar': 'Table.Action.DesignableBar',
              properties: {
                drawer1: {
                  type: 'void',
                  title: '编辑表单',
                  'x-component': 'Action.Modal',
                  'x-component-props': {},
                  properties: {
                    [uid()]: {
                      name: 'form',
                      type: 'void',
                      'x-component': 'Form',
                      'x-component-props': {
                        useValues: '{{ Table.useTableRow }}',
                      },
                      properties: {
                        field1: {
                          type: 'string',
                          title: '字段1',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                        },
                        field2: {
                          type: 'string',
                          title: '字段2',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input',
                        },
                        action: {
                          type: 'void',
                          title: '提交',
                          'x-component': 'Action',
                          'x-component-props': {
                            useAction: '{{ Table.useTableUpdateAction }}',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
            [uid()]: {
              type: 'void',
              title: '删除',
              'x-component': 'Action',
              'x-component-props': {
                useAction: '{{ Table.useTableDestroyAction }}',
              },
            },
          },
        },
      },
    },
  },
};

const form = createForm({
  // designable: true,
});

export default observer(() => {
  return (
    <div>
      <SchemaRenderer scope={{ Table }} form={form} schema={schema} />
    </div>
  );
});
