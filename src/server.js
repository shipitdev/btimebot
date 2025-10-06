const app = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => console.log(`BTimeBot running on port ${PORT}`));