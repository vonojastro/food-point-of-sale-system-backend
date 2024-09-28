import app from './app';

const port = process.env.PORT || 5001;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://127.0.0.1:${port}`);
  /* eslint-enable no-console */
});
