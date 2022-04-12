async function bootstrap() {
  const [{ bootstrap }] = await Promise.all([import('./bootstrap')])
  bootstrap()
}
bootstrap();
