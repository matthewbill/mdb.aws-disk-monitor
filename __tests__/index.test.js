describe('exports', () => {
  test('exports work correctly', () => {

      const { MyModule } = require('../bin/index.js');
      expect(MyModule).toBeDefined();
      
  });
});
