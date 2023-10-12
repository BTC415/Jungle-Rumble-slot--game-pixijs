import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { IReel } from '../@types';
import { PIXI, app, appStage, flags } from '../renderer';
import { loop } from '../system';
import keyboard from '../utils/keyboard';
import { getInfoMask, getReelContainerMask } from '../utils/mask';
import { assetUrls, backout, lerp, show_dialog, slotAnimateUrls, tweenTo, tweening } from '../utils/urls';
import { getInputSprite } from '../utils/input';
import { bubble_animate, fire_animate, gen_card_animated_sprite } from '../utils/utils';
import { getSliderSprite } from '../utils/slider';
import { getCheckSprite } from '../utils/check';
import { App_Dimension, winTextStyle } from '../config';
import { pay_elems } from '../config/pay';

let won_lines:
  Array<{
    won_line_number_arr: Array<number>,
    multiply_val: number,
    pay_line_id: number,
    cur_win: number
  }> = []
let cur_bet_val = 0;
const GamePIXI = () => {
  useEffect(() => {
    console.log(flags)
    if (flags.loaded) {
      // onAssetsLoaded()
    } else {
      PIXI.Assets.load(assetUrls).then(() => {
        appStage.alpha = 0
        return new Promise((resolve) => {
          setTimeout(() => resolve("Go"), 100);
        });
      }).then(onAssetsLoaded);
    }
  }, [])
  const navigate = useNavigate()
  async function onAssetsLoaded() {
    console.log('onAssetsLoaded')
    flags.loaded = true;
    tweenTo(appStage, 'alpha', 0, 1, 1000, backout(1), null, null)
    appStage.removeChildren();





    // const background_bg_sprite = new PIXI.Graphics()
    // background_bg_sprite.filters = [new PIXI.BlurFilter(30, 10)]
    // appStage.addChild(background_bg_sprite)
    // background_bg_sprite.lineStyle(0);
    // background_bg_sprite.beginFill(0x2222ff, 0.1);
    // background_bg_sprite.moveTo(0, -850);
    // background_bg_sprite.lineTo(1920, -850);
    // background_bg_sprite.lineTo(1920, 2000);
    // background_bg_sprite.lineTo(0, 2000);








    const backgroundSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/background.png'))
    backgroundSprite.position.set(-100, -100)
    appStage.addChild(backgroundSprite);

    fire_animate()
    bubble_animate()

    const reelContainer = new PIXI.Container();
    reelContainer.scale.set(0.88)
    reelContainer.position.set(380, -90)
    const reelContainerMask = getReelContainerMask()
    reelContainer.addChild(reelContainerMask)
    reelContainer.mask = (reelContainerMask)


    const reels: IReel[] = []

    for (let i = 0; i < 5; i++) {
      const reel = new PIXI.Container();
      reel.x = i * 265
      const animated_symbols: PIXI.Container[] = []
      const cards: PIXI.Container[] = []
      const card_backs: PIXI.Sprite[] = []
      const url_ids: number[] = []
      const reelItem = {
        reel,
        animated_symbols,
        card_backs,
        cards,
        url_ids,
        position: 0,
        previousPosition: 0,
        blur: new PIXI.BlurFilter(),
      }
      for (let j = 0; j < 4; j++) {
        const cardSprite = new PIXI.Container();
        const cardBackSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/card-back.png'))
        let url_id = Math.floor(Math.random() * slotAnimateUrls.length)
        let compens_arr: number[] = []
        if (i == 0) compens_arr = [1, 2]
        if (i == 1 || i == 4) compens_arr = [0, 1, 2]
        while (compens_arr.includes(url_id)) url_id = Math.floor(Math.random() * slotAnimateUrls.length)
        const cardSymbolWrapperSprite = new PIXI.Container()
        const cardSymbolSprite = gen_card_animated_sprite(slotAnimateUrls[url_id])
        cardSymbolWrapperSprite.addChild(cardSymbolSprite)
        cardSymbolWrapperSprite.position.set(10, 0)
        cardSprite.addChild(cardBackSprite)
        card_backs.push(cardBackSprite)
        cardSprite.addChild(cardSymbolWrapperSprite)
        cardSprite.y = 260 * j
        reel.addChild(cardSprite)
        reelItem.animated_symbols.push(cardSymbolWrapperSprite)
        reelItem.url_ids.push(url_id)
        reelItem.cards.push(cardSprite)
      }
      reels.push(reelItem)
      reelContainer.addChild(reel)
      reelItem.blur.blurX = 0;
      reelItem.blur.blurY = 0;
      reel.filters = [reelItem.blur]
    }
    appStage.addChild(reelContainer)



    const info_dialog_wrapper = new PIXI.Container()
    info_dialog_wrapper.alpha = 0
    const scroll_bar_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/scroll-bar.png'))
    const close_button_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-close.png'))
    const info_bg_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/info-bg.png'))



    const info_bg_sprite_back = new PIXI.Graphics()
    info_bg_sprite.addChild(info_bg_sprite_back)
    info_bg_sprite_back.lineStyle(0);
    info_bg_sprite_back.beginFill(0x222222, 1);
    info_bg_sprite_back.moveTo(-2000, -1000);
    info_bg_sprite_back.lineTo(4000, -1000);
    info_bg_sprite_back.lineTo(4000, 3000);
    info_bg_sprite_back.lineTo(-2000, 3000);







    const info_content_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/info-content.png'))
    const info_bg_sprite_mask = getInfoMask()
    // info_content_sprite.mask = info_bg_sprite_mask
    info_dialog_wrapper.addChild(info_bg_sprite)
    info_dialog_wrapper.addChild(info_content_sprite)
    // info_dialog_wrapper.addChild(info_bg_sprite_mask)
    info_dialog_wrapper.addChild(scroll_bar_sprite)
    info_dialog_wrapper.addChild(close_button_sprite)
    const setting_footer_sprite = new PIXI.Graphics()
    setting_footer_sprite.filters = [new PIXI.BlurFilter(10, 10)]
    // info_dialog_wrapper.addChild(setting_footer_sprite)
    setting_footer_sprite.lineStyle(0);
    setting_footer_sprite.beginFill(0x222222, 1);
    setting_footer_sprite.moveTo(0, 850);
    setting_footer_sprite.lineTo(1920, 850);
    setting_footer_sprite.lineTo(1920, 1000);
    setting_footer_sprite.lineTo(0, 1000);



    const scroll_bar_init_y = 150
    const scroll_bar_end_y = 800
    close_button_sprite.position.set(1590, 80)
    close_button_sprite.eventMode = 'none';
    close_button_sprite.cursor = 'pointer';
    close_button_sprite.on('pointerdown', () => {
      tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
      close_button_sprite.eventMode = 'none';
    })
    scroll_bar_sprite.position.set(1600, scroll_bar_init_y)

    app.stage.addChild(info_dialog_wrapper);
    (flags.info_dialog_wrapper_resize_callback = function () {
      const APP_SCALE = Math.min(app.screen.width / App_Dimension.width, app.screen.height / App_Dimension.height)
      info_dialog_wrapper.scale.set(APP_SCALE)
      info_dialog_wrapper.x = (app.screen.width - App_Dimension.width * APP_SCALE) / 2
      // info_dialog_wrapper.y = (app.screen.height - App_Dimension.height * APP_SCALE) / 2
    })()
    function handleMouseWheel(e: WheelEvent) {
      const deltaY = e.deltaY;
      info_content_sprite.y -= deltaY * 0.5;
      if (info_content_sprite.y > 0) info_content_sprite.y = 0
      const info_content_sprite_height = 2400
      if (info_content_sprite.y < -info_content_sprite_height) info_content_sprite.y = -info_content_sprite_height
      scroll_bar_sprite.y = scroll_bar_init_y - (scroll_bar_end_y - scroll_bar_init_y) * info_content_sprite.y / info_content_sprite_height
    }

    app.view.addEventListener("wheel", handleMouseWheel);

    // const backgroundFooterSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/background-footer.png'))
    // appStage.addChild(backgroundFooterSprite);


    const info_at_statusbarSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-info-bar-empty.png'))
    info_at_statusbarSprite.position.set(-9, 0)
    const status_bar_wrapper = new PIXI.Container();
    const info_help_group = new PIXI.Container();
    info_help_group.scale.set(0)
    const infoButtonSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-info.png'))
    const helpButtonSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-help.png'))






    infoButtonSprite.eventMode = 'static';
    infoButtonSprite.cursor = 'pointer';
    infoButtonSprite.on('pointerdown', () => {
      info_content_sprite.texture = PIXI.Texture.from('/assets/image/info-content.png')
      display_win_text.alpha = 0
      if (info_dialog_wrapper.alpha === 0) {
        tweenTo(info_dialog_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'static'
      }
    })
    helpButtonSprite.eventMode = 'static';
    helpButtonSprite.cursor = 'pointer';
    helpButtonSprite.on('pointerdown', () => {
      display_win_text.alpha = 0
      info_content_sprite.texture = PIXI.Texture.from('/assets/image/help-content.png')
      if (info_dialog_wrapper.alpha === 0) {
        tweenTo(info_dialog_wrapper, 'alpha', 0, 1, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'static'
      }
    })
    helpButtonSprite.position.set(0, 40)
    info_help_group.addChild(infoButtonSprite)
    info_help_group.addChild(helpButtonSprite)

    status_bar_wrapper.addChild(info_at_statusbarSprite)
    status_bar_wrapper.addChild(info_help_group)
    status_bar_wrapper.position.set(225, 850)
    status_bar_wrapper.pivot.set(0, 80)
    appStage.addChild(status_bar_wrapper)
    info_at_statusbarSprite.eventMode = status_bar_wrapper.eventMode = 'static';
    info_at_statusbarSprite.cursor = 'pointer';
    // status_bar_wrapper.interactive = false
    info_at_statusbarSprite.on('pointerdown', () => {
      info_content_sprite.texture = PIXI.Texture.from('/assets/image/info-content.png')
      display_win_text.alpha = 0
      show_dialog(info_dialog_wrapper, close_button_sprite)
    })
    status_bar_wrapper.on('pointerover', () => {
      info_at_statusbarSprite.texture = PIXI.Texture.from('/assets/image/button-info-bar.png')
      tweenTo(info_help_group.scale, 'x', 0, 1, 500, backout(1.3), null, null)
      tweenTo(info_help_group.scale, 'y', 0, 1, 500, backout(1.3), null, null)
    }).on('pointerout', () => {
      info_at_statusbarSprite.texture = PIXI.Texture.from('/assets/image/button-info-bar-empty.png')
      tweenTo(info_help_group.scale, 'x', 1, 0, 500, backout(1), null, null)
      tweenTo(info_help_group.scale, 'y', 1, 0, 500, backout(1), null, null)
    })

    const setting_modal_wrapper = new PIXI.Container()
    setting_modal_wrapper.alpha = 0
    setting_modal_wrapper.position.set(2000, 0)
    appStage.addChild(setting_modal_wrapper)
    setting_modal_wrapper.eventMode = 'static';
    const bg_modal_sprite = new PIXI.Graphics()
    bg_modal_sprite.eventMode = 'static'
    bg_modal_sprite.cursor = 'pointer';
    bg_modal_sprite.on('pointerdown', (event) => {
      if (event.target === bg_modal_sprite) {
        tweenTo(setting_modal_wrapper, 'x', 0, 2000, 500, backout(1), null, null);
        tweenTo(setting_modal_wrapper, 'alpha', 1, 0, 500, backout(1), null, null);
      }
    });
    setting_modal_wrapper.addChild(bg_modal_sprite)
    bg_modal_sprite.lineStyle(0);
    bg_modal_sprite.beginFill(0x222222, 0.01);
    bg_modal_sprite.moveTo(0, 0);
    bg_modal_sprite.lineTo(1920, 0);
    bg_modal_sprite.lineTo(1920, 960);
    bg_modal_sprite.lineTo(0, 960);




    const setting_modal = new PIXI.Container()
    // setting_modal.interactiveChildren = false
    setting_modal_wrapper.addChild(setting_modal)



    setting_modal.position.set(500, 100)
    const bg_setting_sprite = new PIXI.Graphics()
    setting_modal.addChild(bg_setting_sprite)
    bg_setting_sprite.lineStyle(0);
    bg_setting_sprite.beginFill(0x222222, 1);
    bg_setting_sprite.moveTo(0, 0);
    bg_setting_sprite.lineTo(900, 0);
    bg_setting_sprite.lineTo(900, 735);
    bg_setting_sprite.lineTo(0, 735);
    // const bet_amount_arr = Array.from({ length: 14 }, (_, index) => (index + 1) * 100);
    let setting_item_text_arr: PIXI.Text[] = []
    for (let amount = 1; amount <= 7; amount++) {
      const { wrapper: input_element_wrapper } = getInputSprite({
        text: String((amount * 2 - 1) * 100), onChange: val => { setting_item_text_arr[(amount - 1) * 2].text = val }
      })
      setting_modal.addChild(input_element_wrapper)
      const { wrapper: input_element_wrapper2 } = getInputSprite({
        text: String(amount * 200), onChange: val => { setting_item_text_arr[(amount - 1) * 2 + 1].text = val }
      })
      setting_modal.addChild(input_element_wrapper2)
      input_element_wrapper.position.set(200, (amount - 1) * 80 + 150)
      input_element_wrapper2.position.set(500, (amount - 1) * 80 + 150)
    }
    const slider_sprite = getSliderSprite()
    slider_sprite.position.set(400, 60)
    setting_modal.addChild(slider_sprite)
    const inputText = new PIXI.Text('Volume', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    inputText.position.set(260, 45)
    setting_modal.addChild(inputText)
    const check_sprite = getCheckSprite()
    check_sprite.position.set(300, 100)
    setting_modal.addChild(check_sprite)

    const close_button_sprite_2 = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-close.png'))
    setting_modal.addChild(close_button_sprite_2)
    close_button_sprite_2.position.set(850, 20)
    close_button_sprite_2.eventMode = 'static';
    close_button_sprite_2.cursor = 'pointer';
    close_button_sprite_2.on('pointerdown', () => {
      tweenTo(setting_modal_wrapper, 'x', 0, 2000, 500, backout(1), null, null)
      tweenTo(setting_modal_wrapper, 'alpha', 1, 0, 500, backout(1), null, null);
    })

    const setting_at_status_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-setting-empty.png'))
    setting_at_status_sprite.position.set(275, 854)
    appStage.addChild(setting_at_status_sprite)
    setting_at_status_sprite.eventMode = 'static';
    setting_at_status_sprite.cursor = 'pointer';
    setting_at_status_sprite.on('pointerdown', () => {
      if (info_dialog_wrapper.alpha === 1) {
        tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'none'
      }
      if (setting_modal_wrapper.x === 0) {
        tweenTo(setting_modal_wrapper, 'x', 0, 2000, 500, backout(1), null, null)
        tweenTo(setting_modal_wrapper, 'alpha', 1, 0, 500, backout(1), null, null);
      }
      else if (setting_modal_wrapper.x === 2000) {
        tweenTo(setting_modal_wrapper, 'x', 2000, 0, 500, backout(1), null, null)
        tweenTo(setting_modal_wrapper, 'alpha', 0, 1, 500, backout(1), null, null);
      }
    }).on('pointerover', () => {
      setting_at_status_sprite.texture = PIXI.Texture.from('/assets/image/button-setting.png')
    }).on('pointerout', () => {
      setting_at_status_sprite.texture = PIXI.Texture.from('/assets/image/button-setting-empty.png')
    })

    const spinButtonSprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-spin-empty.png'))
    spinButtonSprite.position.set(1547, 869)
    spinButtonSprite.eventMode = 'static';
    spinButtonSprite.cursor = 'pointer';
    spinButtonSprite.on('pointerdown', () => {
      startPlay()
    }).on('pointerover', () => {
      spinButtonSprite.texture = PIXI.Texture.from('/assets/image/button-spin.png')
    }).on('pointerout', () => {
      spinButtonSprite.texture = PIXI.Texture.from('/assets/image/button-spin-empty.png')
    })
    appStage.addChild(spinButtonSprite);



    const settings_list_sprite = new PIXI.Sprite()

    const bg_setting_list_sprite = new PIXI.Graphics()
    bg_setting_list_sprite.eventMode = 'static'
    bg_setting_list_sprite.cursor = 'pointer';
    bg_setting_list_sprite.on('pointerdown', (event) => {
      if (event.target === bg_setting_list_sprite) {
        tweenTo(settings_list_sprite.scale, 'x', 1, 0, 500, backout(1), null, null)
        tweenTo(settings_list_sprite.scale, 'y', 1, 0, 500, backout(1), null, null)
      }
    });
    settings_list_sprite.addChild(bg_setting_list_sprite)
    bg_setting_list_sprite.lineStyle(0);
    bg_setting_list_sprite.beginFill(0x222222, 0.01);
    bg_setting_list_sprite.moveTo(-670, -300);
    bg_setting_list_sprite.lineTo(1920, -300);
    bg_setting_list_sprite.lineTo(1920, 960);
    bg_setting_list_sprite.lineTo(-670, 960);


    settings_list_sprite.pivot.set(120, 560)
    settings_list_sprite.scale.set(0)
    settings_list_sprite.position.set(670, 840)
    for (let i = 0; i < 14; i++) {
      const setting_item_sprite = new PIXI.Container()
      settings_list_sprite.addChild(setting_item_sprite)
      const bg_setting_item = new PIXI.Graphics()
      setting_item_sprite.addChild(bg_setting_item)
      bg_setting_item.lineStyle(0);
      bg_setting_item.beginFill(0x222222, 1);
      bg_setting_item.moveTo(0, 0);
      bg_setting_item.lineTo(200, 0);
      bg_setting_item.lineTo(200, 40);
      bg_setting_item.lineTo(0, 40);
      const setting_item_text = new PIXI.Text(String((i + 1) * 100), { fontFamily: 'Arial', fontSize: 28, fill: 0xffffff });
      setting_item_text.position.set(100, 20)
      setting_item_text.anchor.set(0.5)
      setting_item_sprite.addChild(setting_item_text)
      setting_item_text_arr.push(setting_item_text)

      setting_item_sprite.eventMode = 'static';
      setting_item_sprite.cursor = 'pointer';
      setting_item_sprite.on('pointerdown', () => {
        bet_text.text = setting_item_text.text
        total_bet_text.text = "Total BET: " + parseInt(bline_val_text.text) * parseInt(setting_item_text.text)
        tweenTo(settings_list_sprite.scale, 'x', 1, 0, 500, backout(1), null, null)
        tweenTo(settings_list_sprite.scale, 'y', 1, 0, 500, backout(1), null, null)
      }).on('pointerover', () => {
        bg_setting_item.beginFill(0x000000, 1);
        bg_setting_item.moveTo(0, 0);
        bg_setting_item.lineTo(200, 0);
        bg_setting_item.lineTo(200, 40);
        bg_setting_item.lineTo(0, 40);
      }).on('pointerout', () => {
        bg_setting_item.beginFill(0x222222, 1);
        bg_setting_item.moveTo(0, 0);
        bg_setting_item.lineTo(200, 0);
        bg_setting_item.lineTo(200, 40);
        bg_setting_item.lineTo(0, 40);
      })

      setting_item_sprite.position.set(0, 40 * (13 - i))
    }

    const bet_text = new PIXI.Text('1400', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    const bet_text_static = new PIXI.Text('BET', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    const total_bet_text = new PIXI.Text('Total BET: 1400', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    const earned_text = new PIXI.Text('', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    const balance_text = new PIXI.Text('Balance: 100000', { fontFamily: 'Arial', fontSize: 20, fill: 0xffffff });
    appStage.addChild(bet_text_static)
    appStage.addChild(bet_text)
    appStage.addChild(balance_text)
    appStage.addChild(total_bet_text)
    appStage.addChild(earned_text)
    bet_text_static.position.set(665, 880)
    bet_text_static.anchor.set(0.5)
    bet_text.position.set(665, 930)
    bet_text.anchor.set(0.5)
    balance_text.position.set(230, 915)
    earned_text.position.set(1180, 880)
    earned_text.anchor.set(0.5)
    total_bet_text.anchor.set(0.5)
    total_bet_text.position.set(1150, 920)

    const display_win_text = new PIXI.Text('HERE', winTextStyle);
    appStage.addChild(display_win_text)
    display_win_text.anchor.set(0.5)
    display_win_text.position.set(960, 480)
    display_win_text.alpha = 0
    appStage.addChild(settings_list_sprite)

    const button_wallet_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-wallet-empty.png'))
    button_wallet_sprite.position.set(334, 856)
    appStage.addChild(button_wallet_sprite)
    button_wallet_sprite.eventMode = 'static';
    button_wallet_sprite.cursor = 'pointer';
    button_wallet_sprite.on('pointerdown', () => {
      navigate('/show-history')
    }).on('pointerover', () => {
      button_wallet_sprite.texture = PIXI.Texture.from('/assets/image/button-wallet.png')
    }).on('pointerout', () => {
      button_wallet_sprite.texture = PIXI.Texture.from('/assets/image/button-wallet-empty.png')
    })

    const button_bet_sprite = new PIXI.Sprite(PIXI.Texture.from('/assets/image/button-bet.png'))
    button_bet_sprite.position.set(550, 840)
    appStage.addChild(button_bet_sprite)
    button_bet_sprite.eventMode = 'static';
    button_bet_sprite.cursor = 'pointer';
    button_bet_sprite.on('pointerdown', () => {
      if (setting_modal_wrapper.position.x === 0) {
        tweenTo(setting_modal_wrapper, 'x', 0, 2000, 500, backout(1), null, null);
        tweenTo(setting_modal_wrapper, 'alpha', 1, 0, 500, backout(1), null, null);
      }
      if (info_dialog_wrapper.alpha === 1) {
        tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'none'
      }
      if (settings_list_sprite.scale.x == 0) {
        tweenTo(settings_list_sprite.scale, 'x', 0, 1, 500, backout(1.3), null, null)
        tweenTo(settings_list_sprite.scale, 'y', 0, 1, 500, backout(1.3), null, null)
      } else if (settings_list_sprite.scale.x == 1) {
        tweenTo(settings_list_sprite.scale, 'x', 1, 0, 500, backout(1.2), null, null)
        tweenTo(settings_list_sprite.scale, 'y', 1, 0, 500, backout(1), null, null)
      }

    })
    const bline_wrapper = new PIXI.Container()
    // const bline_bg_sprite = new PIXI.Graphics()
    // bline_wrapper.addChild(bline_bg_sprite)
    // bline_bg_sprite.lineStyle(0);
    // bline_bg_sprite.beginFill(0x222222, 0.5);
    // bline_bg_sprite.drawRoundedRect(0, 0, 180, 90, 20)
    bline_wrapper.position.set(5, 850)
    const bline_text = new PIXI.Text('Line', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    bline_text.position.set(60, 5)
    bline_wrapper.addChild(bline_text)
    const dec_text = new PIXI.Text('-', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    dec_text.position.set(10, 30)
    bline_wrapper.addChild(dec_text)
    const inc_text = new PIXI.Text('+', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    inc_text.position.set(150, 30)
    bline_wrapper.addChild(inc_text)
    const bline_val_text = new PIXI.Text('1', { fontFamily: 'Arial', fontSize: 32, fill: 0xffffff });
    bline_val_text.anchor.set(0.5)
    bline_val_text.position.set(90, 60)
    bline_wrapper.addChild(bline_val_text)
    inc_text.eventMode = 'static';
    inc_text.cursor = 'pointer';
    inc_text.on('pointerdown', () => {
      const cur_bline = parseInt(bline_val_text.text)
      let new_bline = Math.min(cur_bline + 1, 20)
      bline_val_text.text = new_bline
      total_bet_text.text = "Total BET: " + new_bline * parseInt(bet_text.text)
    })
    dec_text.eventMode = 'static';
    dec_text.cursor = 'pointer';
    dec_text.on('pointerdown', () => {
      const cur_bline = parseInt(bline_val_text.text)
      let new_bline = Math.max(cur_bline - 1, 1)
      bline_val_text.text = new_bline
      total_bet_text.text = "Total BET: " + new_bline * parseInt(bet_text.text)
    })

    appStage.addChild(bline_wrapper)

    const spaceKey: any = keyboard(" ")
    spaceKey.press = startPlay;

    let cur_timing_counter = 0
    function reelsComplete() {
      running = false;
      const result: Array<Array<number>> = []
      for (let i = 0; i < 5; i++) {
        const reel_arr = []
        const cur_pos = Math.round((reels[i].position + 400) % reels[i].animated_symbols.length)
        for (let j = 1; j < 4; j++) {
          reel_arr.push(reels[i].url_ids[(j - cur_pos + 400) % 4])
        }
        result.push(reel_arr)
      }
      const pay_table = [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0],
        [1, 1, 0, 1, 2],
        [1, 1, 2, 1, 0],
        [2, 2, 2, 2, 2],
        [1, 0, 1, 2, 1],
        [1, 0, 1, 2, 2],
        [1, 0, 0, 1, 2],
        [1, 2, 1, 0, 1],
        [1, 2, 2, 1, 0],
        [1, 2, 1, 0, 0],
        [0, 1, 2, 1, 0],
        [0, 1, 1, 1, 2],
        [0, 0, 1, 2, 2],
        [0, 0, 1, 2, 1],
        [0, 0, 0, 1, 2],
        [2, 1, 0, 1, 2],
        [2, 1, 1, 1, 0],
        [2, 2, 1, 0, 0],
        [2, 2, 1, 0, 1],
      ]
      let earned = 0;
      for (let i = 0; i < parseInt(bline_val_text.text); i++) {
        const pay_line = pay_table[i]

        let matching = 0
        let cur = 0
        while (matching < 5 && (cur = result[matching][pay_line[matching]]) < 3) matching++;
        matching++;
        while (matching < 5) {
          const reel_result = result[matching][pay_line[matching]]
          if (cur !== reel_result) {
            if (reel_result >= 3) break;
          }
          matching++;
        }
        if (matching > 2) {
          const won_line_number_arr: number[] = []
          let multiply_val = 1;
          for (let j = 0; j < matching; j++) {
            const won_line_number = Math.round(pay_line[j] - reels[j].position + 4000 + 1) % 4;
            // (reels[j].animated_symbols[won_line_number].getChildAt(0) as PIXI.AnimatedSprite).play()
            won_line_number_arr.push(won_line_number)
            const cur_result_item = result[j][pay_line[j]]
            if (cur_result_item == 1 || cur_result_item == 2) multiply_val *= (cur_result_item + 1)

          }
          tweenTo(display_win_text, 'alpha', 0, 1, 500, backout(1), null, null)
          const cur_win = parseInt(bet_text.text) * pay_elems[matching - 3] * multiply_val
          won_lines.push({ won_line_number_arr, multiply_val, pay_line_id: i + 1, cur_win })
          earned += cur_win
        }
      }
      if (earned > 0) {
        earned_text.text = earned + " FUN Earned"
      }
      const slotInfo = {
        id: new Date().getTime(),
        bet: parseInt(total_bet_text.text.substring(11)),
        won_lines,
        blines: parseInt(bline_val_text.text),
        time: new Date()
      }
      const slot_infos: Array<any> = JSON.parse(localStorage.getItem('slotinfo') || '[]')
      slot_infos.unshift(slotInfo)
      localStorage.setItem('slotinfo', JSON.stringify(slot_infos))
      balance_text.text = "Balance: " + (parseInt(balance_text.text.substring(9)) + earned)
      cur_timing_counter = 0
      button_bet_sprite.eventMode = inc_text.eventMode = dec_text.eventMode = 'static'
    }
    function startPlay() {

      if (running) return;
      running = true;

      button_bet_sprite.eventMode = inc_text.eventMode = dec_text.eventMode = 'none'
      cur_bet_val = parseInt(bet_text.text)
      if (info_dialog_wrapper.alpha === 1) {
        tweenTo(info_dialog_wrapper, 'alpha', 1, 0, 500, backout(1), null, null)
        close_button_sprite.eventMode = 'none'
      }
      if (display_win_text.alpha === 1) {
        tweenTo(display_win_text, 'alpha', 1, 0, 500, backout(1), null, null)
      }
      if (setting_modal_wrapper.x === 0) {
        tweenTo(setting_modal_wrapper, 'x', 0, 2000, 500, backout(1), null, null)
        tweenTo(setting_modal_wrapper, 'alpha', 1, 0, 500, backout(1), null, null);
      }
      const cur_bal = parseInt(balance_text.text.substring(9))
      const cur_total_bet = parseInt(total_bet_text.text.substring(11))
      balance_text.text = "Balance: " + (cur_bal - cur_total_bet)
      earned_text.text = "";
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 4; j++) {
          (reels[i].animated_symbols[j].getChildAt(0) as PIXI.AnimatedSprite).stop()
          reels[i].card_backs[j].alpha = 1;
          reels[i].cards[j].alpha = 1
        }
      }

      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + 50 + i * 5 + extra;
        const time = 800 + i * 500 + extra * 0;

        tweenTo(r, 'position', r.position, target, time, backout(1.1), null, i === reels.length - 1 ? reelsComplete : null);
        // for (let j = 0; j < 4; j++) {
        //     r.cards[j].alpha = 1
        // }
      }
      won_lines = []
    }
    app.ticker.add(() => {
      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        r.blur.blurX = (r.position - r.previousPosition) * 1;
        r.blur.blurY = (r.position - r.previousPosition) * 0;
        for (let j = 0; j < r.animated_symbols.length; j++) {
          const s = r.animated_symbols[j];
          const c = r.cards[j];
          const rel_position = (r.position + j) % r.animated_symbols.length
          const relativePositionY = rel_position * 260;
          const globalPosition = c.toGlobal(new PIXI.Point(0, relativePositionY));
          c.position = (c.toLocal(globalPosition))
          if (rel_position < 1 && (r.previousPosition + j) % r.animated_symbols.length > 3) {
            let url_id = Math.floor(Math.random() * slotAnimateUrls.length)
            let compens_arr: number[] = []
            if (i == 0) compens_arr = [1, 2]
            if (i == 1 || i == 4) compens_arr = [0, 1, 2]
            while (compens_arr.includes(url_id)) url_id = Math.floor(Math.random() * slotAnimateUrls.length)
            s.removeChildren()
            s.addChild(gen_card_animated_sprite(slotAnimateUrls[url_id]))
            r.url_ids[j] = url_id
          }
        }
        r.previousPosition = r.position;
      }
    });
    app.ticker.add((delta) => {

      const count = 2
      cur_timing_counter += delta / 20

      if (won_lines.length === 0) return

      for (let i = 0; i < reels.length; i++) {
        for (let j = 0; j < 4; j++) {
          reels[i].cards[j].alpha = 0.2;
          reels[i].card_backs[j].alpha = 0.2;
          (reels[i].animated_symbols[j].getChildAt(0) as PIXI.AnimatedSprite).stop()
        }
      }

      const won_line = won_lines[Math.floor(cur_timing_counter / Math.PI / 2) % won_lines.length]
      display_win_text.text = cur_bet_val * pay_elems[won_line.won_line_number_arr.length - 3] + (won_line.multiply_val === 1 ? " " : "X" + won_line.multiply_val)
      for (let j = 0; j < won_line.won_line_number_arr.length; j++) {
        reels[j].cards[won_line.won_line_number_arr[j]].alpha = 1
        const symbol = reels[j].animated_symbols[won_line.won_line_number_arr[j]].getChildAt(0) as PIXI.AnimatedSprite
        if (!symbol.playing) {
          symbol.play()
        }
        reels[j].card_backs[won_line.won_line_number_arr[j]].alpha = (Math.cos(cur_timing_counter * count) + 4) / 5
      }
      // })
    });

    // app.ticker.add((delta) => {

    //   const count = 2
    //   cur_timing_counter += delta / 20
    //   for (let i = 0; i < reels.length; i++) {
    //     for (let j = 0; j < 4; j++) {
    //       reels[i].cards[j].alpha = 1
    //     }
    //   }
    //   if (won_lines.length === 0) return
    //   // won_lines.forEach(won_line => {

    //   const won_line = won_lines[Math.floor(cur_timing_counter / Math.PI / 2) % won_lines.length]
    //   display_win_text.text = cur_bet_val * pay_elems[won_line.won_line_number_arr.length - 3] + (won_line.multiply_val === 1 ? " " : "X" + won_line.multiply_val)
    //   for (let j = 0; j < won_line.won_line_number_arr.length; j++) {
    //     reels[j].cards[won_line.won_line_number_arr[j]].alpha = (Math.cos(cur_timing_counter * count) + 4) / 5
    //   }
    //   // })
    // });
  }


  app.ticker.add(() => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
      const t = tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);
      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) t.change(t);
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) t.complete(t);
        remove.push(t);
      }
    }
    for (let i = 0; i < remove.length; i++) {
      tweening.splice(tweening.indexOf(remove[i]), 1);
    }
  });

  let running = false;
  // Game Loop.
  app.ticker.add((deltaTime: number) => loop(deltaTime, true));
  return (
    <div>

    </div>
  )
}
export default GamePIXI;