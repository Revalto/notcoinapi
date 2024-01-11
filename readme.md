## Дополнительная информация
Author: Revalto
TON Wallet: UQBMOIVDlQG5r_VdzbZhVF9Xi4k388Ap9ti-XAfWFPo32bgz

## Пример использования
```
const NotCoint = require('notcoinapi');
const notCoin = new NotCoin(`https://clicker.joincommunity.xyz/clicker#tgWebAppData=query_id%.....`);

(async () => {
    await notCoin.event();
    await notCoin.auth();

    setInterval(async () => {
        try {
            let profile = notCoin.getProfile();

            if(profile.availableCoins < 100) {
                return;
            }

            let clickCount = 1;

            if(profile.availableCoins > 1790) {
                clickCount = 1590;
            } else {
                clickCount = notCoin.rand(1, profile.availableCoins - 100);
            }

            await notCoin.click(clickCount);

            profile = notCoin.getProfile();

            console.log(`Click count: ${profile.availableCoins} | Balance: ${profile.balanceCoins}`);
        } catch (e) {
            console.log(e.message);
        }
    }, 15000);
})();
```

## Где взять URL ?
1. Авторизуйтесь с компьютера в [Telegram Web](https://web.telegram.org).
2. После авторизации перейдите в бота [Notcoin Bot](https://web.telegram.org/k/#@notcoin_bot).
3. Нажмите клавишу F12 (или откройте Исходный код страницы), затем перейдите на вкладку "Сеть". Если необходимо, обновите страницу нажатием клавиши F5.
4. Нажмите кнопку, отвечающую за вход в приложение.
   ![images/img.png](img.png)
5. Найдите событие "event" на вкладке "Сеть".
   ![images/img_2.png](img_2.png)
6. Из интересующего нас события скопируйте параметр "u" (ссылка будет иметь примерно следующий вид):
   ```
   https://clicker.joincommunity.xyz/clicker#tgWebAppData=query_id%*D**GO*-**AA**AI***gwalO3m%26user%3D%257B%2522id%2522%253A2****0478%252C%2522first_name%2522%253A%2522*******%2522%252C%2522last_name%2522%253A%2522*******%2522%252C%2522username%2522%253A%2522******%2522%252C%2522language_code%2522%253A%2522ru%2522%252C%2522is_premium%2522%253Atrue%252C%2522allows_write_to_pm%2522%253Atrue%257D%26auth_date%3D170**16279%26hash%3D7dfa***db35***b593aa80f3***9858ca0649c5***cd001bf888888b770a3ff0e&tgWebAppVersion=7.0&tgWebAppPlatform=web&tgWebAppThemeParams=%7B%22bg_color%22%3A%22%23ffffff%22%2C%22button_color%22%3A%22%233390ec%22%2C%22button_text_color%22%3A%22%23ffffff%22%2C%22hint_color%22%3A%22%23707579%22%2C%22link_color%22%3A%22%2300488f%22%2C%22secondary_bg_color%22%3A%22%23f4f4f5%22%2C%22text_color%22%3A%22%23000000%22%2C%22header_bg_color%22%3A%22%23ffffff%22%2C%22accent_text_color%22%3A%22%233390ec%22%2C%22section_bg_color%22%3A%22%23ffffff%22%2C%22section_header_text_color%22%3A%22%233390ec%22%2C%22subtitle_text_color%22%3A%22%23707579%22%2C%22destructive_text_color%22%3A%22%23df3f40%22%7D
   ```
7. В скопированной ссылке замените параметр "tgWebAppPlatform=web" на "tgWebAppPlatform=ios".
   tgWebAppPlatform=web
   Мы его заменяем на ios
   tgWebAppPlatform=ios.
   Измененную ссылку отправляем в браузер.

### ВАЖНО
C 07.01 сессия с браузера держится не более 3ех часов.
Для того, чтобы все работало, необходимо проделать действия с 3 пункта