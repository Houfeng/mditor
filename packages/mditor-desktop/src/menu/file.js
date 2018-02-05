const app = require('electron').app;
const recent = require('../recent');
const i18n = require('../i18n');

module.exports = async() => {
  let locale = i18n.locale;
  let recentItems = await recent.getItems();
  recentItems = recentItems.map(filename => {
    return {
      label: filename,
      click() {
        app.openFileInWindow(filename);
      }
    };
  });
  recentItems.push({
    type: 'separator'
  });
  recentItems.push({
    label: locale.clearRecent,
    click() {
      recent.clear();
    }
  });

  return {
    label: locale.file,
    role: 'file',
    submenu: [{
        label: locale.newFile,
        accelerator: 'CmdOrCtrl+N',
        click() {
          app.createWindow();
        }
      },
      {
        type: 'separator'
      },
      {
        label: `${locale.open}...`,
        accelerator: 'CmdOrCtrl+O',
        click() {
          app.open();
        }
      },
      {
        label: locale.recentItems,
        submenu: recentItems
      },
      {
        type: 'separator'
      },
      {
        accelerator: 'CmdOrCtrl+S',
        label: `${locale.save}...`,
        click() {
          app.save();
        }
      },
      {
        accelerator: 'Shift+CmdOrCtrl+S',
        label: `${locale.saveAs}...`,
        click() {
          app.saveAs();
        }
      },
      {
        type: 'separator'
      },
      {
        label: locale.export,
        submenu: [{
          label: `${locale.html}...`,
          click() {
            app.toHTML();
          }
        }, {
          label: `${locale.pdf}...`,
          click() {
            app.toPDF();
          }
        }, {
          label: `${locale.image}...`,
          click() {
            app.toImage();
          }
        }, {
          label: `${locale.slide}...`,
          click() {
            app.toSlide();
          }
        }]
      }, {
        type: 'separator'
      }, {
        label: locale.quit,
        click() {
          app.quit();
        }
      }
    ]
  };
};