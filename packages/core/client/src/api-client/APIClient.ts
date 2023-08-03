import { APIClient as APIClientSDK } from '@nocobase/sdk';
import { Result } from 'ahooks/es/useRequest/src/types';
import { notification } from 'antd';
import React from 'react';

const handleErrorMessage = (error, notification) => {
  const reader = new FileReader();
  reader.readAsText(error?.response?.data, 'utf-8');
  reader.onload = function () {
    notification.error({
      message: JSON.parse(reader.result as string).errors?.map?.((error: any) => {
        return React.createElement('div', { children: error.message });
      }),
    });
  };
};

const errorCache = new Map();
export class APIClient extends APIClientSDK {
  services: Record<string, Result<any, any>> = {};
  silence = false;
  /** 该值会在 AntdAppProvider 中被重新赋值 */
  notification: any = notification;

  service(uid: string) {
    return this.services[uid];
  }

  interceptors() {
    this.axios.interceptors.request.use((config) => {
      config.headers['X-With-ACL-Meta'] = true;
      const match = location.pathname.match(/^\/apps\/([^/]*)\//);
      if (match) {
        config.headers['X-App'] = match[1];
      }
      return config;
    });
    super.interceptors();
    this.useNotificationMiddleware();
  }

  useNotificationMiddleware() {
    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log('response', error?.response)
        if (this.silence) {
          throw error;
        }
        const redirectTo = error?.response?.data?.redirectTo;
        if (redirectTo) {
          return (window.location.href = redirectTo);
        }
        if (error?.response?.data?.type === 'application/json') {
          handleErrorMessage(error, this.notification);
        } else {
          if (errorCache.size > 10) {
            errorCache.clear();
          }
          let errs = error?.response?.data?.errors || [{ message: 'Server error' }];
          errs = errs.filter((error) => {
            const lastTime = errorCache.get(error.message);
            if (lastTime && new Date().getTime() - lastTime < 500) {
              return false;
            }
            errorCache.set(error.message, new Date().getTime());
            return true;
          });
          if (errs.length === 0) {
            throw error;
          }
          this.notification.error({
            message: errs?.map?.((error: any) => {
              return React.createElement('div', {}, error.message);
            }),
          });
        }
        throw error;
      },
    );
  }

  silent() {
    this.silence = true;
    return this;
  }
}
