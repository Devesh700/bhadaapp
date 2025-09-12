
import {UserModel as User} from '../modules/user/user.model';
import {TransactionModel as Transaction} from '../modules/transaction/transaction.model';
import {NotificationModel as Notification} from '../modules/notification/notification.model';
import {TopupModel as Topup} from '../modules/topup/topup.model';

export const COIN_RATES = {
  CONTACT_VIEW: 10,
  WHATSAPP_CONTACT: 15,
  PROPERTY_SEARCH: 5,
  PROPERTY_LISTING: 20, // after 2 free listings
  PRIME_LISTING: 150,
  VERIFICATION_BADGE: 100,
  REJECTION_PENALTY: 10
};

export const TOPUP_PLANS: Record<number, number> = {
  20: 15,   // ₹20 = 15 coins
  50: 30,   // ₹50 = 30 coins
  100: 50,  // ₹100 = 50 coins
  200: 100  // ₹200 = 100 coins
};

const createNotification = async (userId: string, title: string, message: string, referenceId: any = null) => {
  await Notification.create({
    userId,
    title,
    message,
    type: title.includes('Credited') ? 'coin_credit' : 'coin_debit',
    referenceId,
    isRead: false,
    createdAt: new Date()
  });
};

export const debitCoins = async (
  userId: string,
  amount: number,
  reason: string,
  referenceId: any = null
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  if (user.wallet.coins < amount) {
    throw new Error('Insufficient coins');
  }

  const balanceBefore = user.wallet.coins;
  const balanceAfter = balanceBefore - amount;

  await User.updateOne(
    { _id: userId },
    {
      $inc: {
        'wallet.coins': -amount,
        'wallet.totalSpent': amount
      }
    }
  );

  await Transaction.create({
    userId,
    transactionType: 'debit',
    amount,
    reason,
    referenceId,
    balanceBefore,
    balanceAfter,
    createdAt: new Date()
  });

  await createNotification(userId, 'Coins Debited', `${amount} coins debited for ${reason}`, referenceId);
};

export const creditCoins = async (
  userId: string,
  amount: number,
  reason: string,
  referenceId: any = null
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const balanceBefore = user.wallet.coins;
  const balanceAfter = balanceBefore + amount;

  await User.updateOne(
    { _id: userId },
    {
      $inc: {
        'wallet.coins': amount,
        'wallet.totalEarned': amount
      }
    }
  );

  await Transaction.create({
    userId,
    transactionType: 'credit',
    amount,
    reason,
    referenceId,
    balanceBefore,
    balanceAfter,
    createdAt: new Date()
  });

  await createNotification(userId, 'Coins Credited', `${amount} coins credited for ${reason}`, referenceId);
};

export const handleTopup = async (
  userId: string,
  amount: number,
  paymentId: string,
  paymentMethod: string
) => {
  const coins = TOPUP_PLANS[amount];
  if (!coins) throw new Error('Invalid topup plan');

  const topup = await Topup.create({
    userId,
    amount,
    coins,
    paymentId,
    paymentStatus: 'success',
    paymentMethod,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await creditCoins(userId, coins, 'topup', topup._id);

  return topup;
};