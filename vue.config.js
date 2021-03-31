module.exports = {
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'BAR签到器';
      return args;
    });
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        copyright: 'Copyright (c) 2020 BAR Team',
        productName: 'BAR签到器',
        win: {
          icon: 'public/icon.ico',
        },
        nsis: {
          oneClick: false,
          language: '2052',
          perMachine: true,
          allowToChangeInstallationDirectory: true,
          installerIcon: 'public/icon.ico',
          uninstallerIcon: 'public/icon.ico',
        },
      },
    },
  },
};
