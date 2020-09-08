import { NextFunction, Request, Response, Router } from 'express';
interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined };
}
const router = Router();

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not Authorized');
};

router.get('/', (req: Request, res: Response) => {
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <form method="POST">
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input name="password" type="password" />
      </div>
      <button>Submit</button>
    </form>
  `);
});

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;
  if (
    email &&
    password &&
    email === 'hano@gmail.com' &&
    password === 'password'
  ) {
    req.session = { loggedIn: true };
    res.redirect('/');
  } else {
    throw new Error('Invalid email or password');
  }
});

router.get('/logout', (req: Request, res: Response) => {
  req.session = null;
  res.redirect('/');
});

router.get('/protected', authenticate, (req: Request, res: Response) => {
  res.send('You made it, you can see the gem 💎  now! 🙌');
});

export { router };
