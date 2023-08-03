import { Schema } from '@formily/json-schema';
import { BaseError } from '@nocobase/database';
import { Plugin } from '@nocobase/server';
import { lodash } from '@nocobase/utils';
import { ErrorHandler } from './error-handler';
import enUS from './locale/en_US';
import zhCN from './locale/zh_CN';

export class PluginErrorHandler extends Plugin {
  errorHandler: ErrorHandler = new ErrorHandler();
  i18nNs = 'error-handler';

  beforeLoad() {
    this.registerSequelizeValidationErrorHandler();
  }

  registerSequelizeValidationErrorHandler() {
    const findFieldTitle = (instance, path, tFunc) => {
      if (!instance) {
        return path;
      }

      const model = instance.constructor;
      console.log('====================================');
      console.log('model--', model);
      console.log('====================================');
      const collection = this.db.modelCollection.get(model);
      const field = collection.getField(path);
      const fieldOptions = Schema.compile(field?.options, { t: tFunc });
      const title = lodash.get(fieldOptions, 'uiSchema.title', path);
      console.log('title--', title)
      return title;
    };

    this.errorHandler.register(
      (err) => err?.errors?.length && err instanceof BaseError,
      (err, ctx) => {
        ctx.body = {
          errors: err.errors.map((err) => {
            return {
              message: ctx.i18n.t(err.type, {
                ns: this.i18nNs,
                field: findFieldTitle(err.instance, err.path, ctx.i18n.t),
              }),
            };
          }),
        };
        ctx.status = 400;
      },
    );
  }

  async load() {
    this.app.i18n.addResources('zh-CN', this.i18nNs, zhCN);
    this.app.i18n.addResources('en-US', this.i18nNs, enUS);
    this.app.use(this.errorHandler.middleware(), { before: 'cors', tag: 'errorHandler' });
  }
}
