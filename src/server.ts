import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
ValidateEnv();
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { RestaurantRoute } from './routes/restaurant.route';
import { PersonalUserDetailsRoute } from './routes/personalUserDetails.route';

const app = new App([new AuthRoute(), new UserRoute(), new RestaurantRoute(), new PersonalUserDetailsRoute()]);

app.listen();
