import path from 'path';
import fs from 'fs';
import { remote } from 'electron';
import { ElMessage } from 'element-plus';
import { ADMIN_ID } from './constant';

export default class Utils {
  static saveApi(apiList) {
    Object.keys(apiList).forEach((api) => {
      sessionStorage.setItem(`api:${api}`, apiList[api]);
    });
  }

  static getApi(name) {
    return sessionStorage.getItem(`api:${name}`) ?? '';
  }

  static saveWidget(widgetList) {
    Object.keys(widgetList).forEach((widget) => {
      sessionStorage.setItem(`widget:${widget}`, widgetList[widget]);
    });
  }

  static getWidget(widget) {
    return sessionStorage.getItem(`widget:${widget}`) ?? '';
  }

  static getConfig() {
    const filePath = path.join(
      remote.app.getPath('home'),
      '.barconfig/signin.json'
    );
    const isExists = fs.existsSync(filePath);

    if (!isExists) {
      ElMessage.error({ message: '未找到配置文件' });
      return false;
    }

    const config = JSON.parse(fs.readFileSync(filePath).toString());
    const { api, widget } = config;

    this.saveApi(api);
    this.saveWidget(widget);

    return true;
  }

  static getAdminId() {
    return sessionStorage.getItem(`param:${ADMIN_ID}`);
  }

  static setAdminId(admin_id) {
    sessionStorage.setItem(`param:${ADMIN_ID}`, admin_id);
  }
}
