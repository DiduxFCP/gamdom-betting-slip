import express from 'express';
import { betslipRouter, authRouter } from './src/app';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use('/api/v1/betting-slip', betslipRouter);
app.use('/api/v1/users', authRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
});
