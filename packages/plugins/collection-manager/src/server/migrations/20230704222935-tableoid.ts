import { Migration } from '@nocobase/server';
import { lodash as _ } from '@nocobase/utils';

export default class extends Migration {
  async up() {
    if (!this.db.inDialect('postgres')) {
      return;
    }
    const repository = this.db.getRepository('collections');
    let names = [];
    const items = await repository.find();
    for (const item of items) {
      if (Array.isArray(item.options?.inherits) && item.options.inherits.length) {
        names.push(item.name);
        names.push(...item.options.inherits);
      }
    }
    names = _.uniq(names);
    console.log('collection names:', names);
    for (const name of names) {
      const fieldRepository = this.db.getRepository('fields');
      await fieldRepository.firstOrCreate({
        values: {
          collectionName: name,
          name: '__collection',
          type: 'virtual',
          interface: 'tableoid',
          uiSchema: {
            type: 'string',
            title: '{{t("Table OID")}}',
            'x-component': 'CollectionSelect',
            'x-component-props': { isTableOid: true },
            'x-read-pretty': true,
          },
        },
        filterKeys: ['name', 'collectionName'],
      });
    }
  }
}
