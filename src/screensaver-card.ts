import { css, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "custom-card-helpers";

@customElement("screensaver-card")
export class ScreensaverCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private config!: any;
  @state() private cg_alert: boolean = false; // Stato per gestire l'evento cg_alert
  @state() private hourlyForecastEvent?: any;
  @state() private subscribedToHourlyForecast?: Promise<() => void>;
  @state() private events: any[] = []; // Array per salvare gli eventi
  private calendars: any[] = []; // Variabile per memorizzare i calendari
  private loadLocalFont(scriptDirectory: string, path: string) {
    const style = document.createElement("style");
    console.log(scriptDirectory);
    style.textContent = `
      @font-face {
        font-family: 'bw_font';
        // src: url('${scriptDirectory}/BwModelica-HairlineExpanded.otf') format('truetype');
        src: url('/local/BwModelica-HairlineExpanded.otf') format('truetype');
      }

     
    `;
    document.head.appendChild(style);
  }

  static weatherIconsDay = {
    clear: "day",
    "clear-night": "night",
    cloudy: "cloudy",
    fog: "fog",
    hail: "hail",
    lightning: "lightning",
    "lightning-rainy": "lightning-rainy",
    partlycloudy: "partlycloudy",
    pouring: "pouring",
    rainy: "rainy",
    snowy: "snowy",
    "snowy-rainy": "snowy-rainy",
    sunny: "day",
    windy: "windy",
    "windy-variant": "windy-variant",
    exceptional: "!!",
  };

  constructor() {
    super();
    const scriptPath = new URL(import.meta.url).pathname;
    const scriptDirectory = scriptPath.substring(
      0,
      scriptPath.lastIndexOf("/")
    );
    this.loadLocalFont(scriptDirectory, scriptPath);
  }

  static get styles() {
    return css`
      ha-card {
        background-color: black;
        margin: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      h2 {
        margin-bottom: 8px;
      }
      .gradient-bar {
        width: 100%;
        height: 2px;
        background: linear-gradient(
          to right,
          black,
          rgba(255, 255, 255, 0.3),
          black
        );
        position: relative;
        top: 42px;
      }
      .timeline {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        overflow-x: auto;
        justify-content: space-between;
        height: auto;
      }
      .timeline-item {
        flex: 0 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: -webkit-fill-available;
      }
      .condition {
        height: 50px;
      }
      .condition img {
        width: 40px;
        height: 40px;
      }
      .details {
        font-size: 0.9em;
        color: #757575;
      }
      .details .hour {
        font-weight: bold;
      }
      .details .temperature {
        color: #ff5722;
      }
      .details .temperature.cold {
        color: #2196f3;
      }
      .details .temperature.hot {
        color: #f44336;
      }
      .details .precipitation {
        color: #9e9e9e;
        font-size: 0.8em;
      }
      .main-grid {
        height: 100%;
        background-color: black;
        display: grid;
        grid-template-areas:
          ". icon icon now_icon alert"
          ". . . temp ."
          ". date . cal-event ."
          "tline tline tline tline tline";
        grid-template-columns: 7vw auto auto auto 1vw;
        grid-template-rows: auto auto 1fr auto;
        padding-top: 1vw;
      }
      .div-temp {
        grid-area: temp;
        justify-self: end;
      }
      #date-time {
        grid-area: date;
        font-family: bw_font, monospace;
        color: white;
        align-self: end;
        justify-self: start;
      }
      .time,
      .date {
        text-align: center;
        font-family: bw_font, monospace;
        line-height: 1;
      }
      .time {
        font-size: 13vw;
        white-space: nowrap;
      }
      .date {
        font-size: 4.5vw;
        display: flex;
        justify-content: space-between;
      }
      #entityState {
        display: flex;
        flex-direction: column;
        justify-content: end;
        line-height: 1;
      }
      .entity {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 1vh;
      }
      .friendly-name {
        display: flex;
        justify-content: flex-end;
        font-size: 1.7vh;
        color: #757575;
      }
      .value {
        display: flex;
        font-size: 2vh;
        margin-top: 0.5vh;
        color: white;
      }
      .state {
        margin-left: auto;
        margin-right: 4px;
      }
      .unit {
        font-style: italic;
        color: #757575;
      }
      #icon-state-div {
        grid-area: icon;
        margin-top: 4vh;
      }
      ha-icon {
        --mdc-icon-size: 4.5vh;
        color: #757575;
      }
      .now-icon {
        grid-area: now_icon;
        justify-self: end;
        width: 27vw;
        height: 100%;
      }
      .ext-temp {
        font-family: "bw_font";
        font-weight: bold;
        font-size: 4vh;
        color: #757575;
      }
      .events {
        display: flex;
        flex-direction: column;
        justify-content: end;
        color: white;
        line-height: 1;
      }
      .event {
        margin-bottom: 10px;
        text-align: right;
        color: white;
      }
      .event-title {
        text-align: right;
        margin-top: 1vh;
        font-size: 2vh;
      }
      .event-time {
        color: #757575;
        text-align: right;
        font-size: 1.7vh;
      }
      .no-events {
        color: #999;
        font-style: italic;
        text-align: right;
      }
      .cg-alert {
        grid-area: alert;
        width: 2vw;
        aspect-ratio: 1/1;
        border-radius: 50%;
        background-color: red;
        position: relative;
        top: 1.5%;
        right: 100%;
        opacity: 0.6;
      }
      .hidden {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
      .visible {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }
    `;
  }

  // Metodo per ottenere i calendari configurati
  private async getCalendars() {
    try {
      const calendarEntities = this.config?.calendars || [];
      if (!calendarEntities.length) {
        this.calendars = [];
        return;
      }

      const calendars = await Promise.all(
        calendarEntities.map((calendar: any) =>
          this.hass.callApi("GET", `calendars/${calendar}`)
        )
      );

      this.calendars = calendars;
    } catch {
      this.calendars = [];
    }
  }

  private async getEvents() {
    const calendarEntities = this.config?.calendars || [];
    if (!calendarEntities.length) return;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 7);

    try {
      const events = await this.fetchCalendarEvents(
        this.hass,
        start,
        end,
        calendarEntities
      );
      const filteredEvents = this.filterDuplicateEvents(events);
      this.checkCGAlert(filteredEvents);
      this.events = filteredEvents
        .filter((event) => event.summary !== "cg_alert")
        .slice(0, 5);
    } catch {
      this.events = [];
    }
  }

  private async fetchCalendarEvents(
    hass: HomeAssistant,
    start: Date,
    end: Date,
    calendars: string[]
  ): Promise<any[]> {
    const promises = calendars.map((cal) =>
      hass.callApi(
        "GET",
        `calendars/${cal}?start=${start.toISOString()}&end=${end.toISOString()}`
      )
    );

    const results = await Promise.allSettled(promises);

    return results
      .filter((result) => result.status === "fulfilled")
      .flatMap((result) => (result as PromiseFulfilledResult<any[]>).value);
  }

  private filterDuplicateEvents(events: any[]): any[] {
    const seen = new Set();
    return events.filter((event) => {
      const uniqueKey = `${event.summary}-${event.start}`;
      if (seen.has(uniqueKey)) return false;
      seen.add(uniqueKey);
      return true;
    });
  }

  private checkCGAlert(events: any[]) {
    const now = new Date();
    const alertEvent = events.find((event) => {
      const start = event.start?.dateTime || event.start;
      const end = event.end?.dateTime || event.end;
      const startDate = new Date(start);
      const endDate = new Date(end);

      return (
        event.summary === "cg_alert" &&
        !isNaN(startDate.getTime()) &&
        !isNaN(endDate.getTime()) &&
        startDate <= now &&
        now <= endDate
      );
    });

    this.cg_alert = !!alertEvent;
  }

  private formatEventDate(dateInput: string | { dateTime: string }): string {
    try {
      const dateStr =
        typeof dateInput === "object" && "dateTime" in dateInput
          ? dateInput.dateTime
          : dateInput;
      const parsedDate = new Date(dateStr);

      if (isNaN(parsedDate.getTime())) {
        throw new Error("invalid date");
      }

      return `${parsedDate.toLocaleDateString()} ${parsedDate.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`;
    } catch {
      return "invalid date";
    }
  }

  firstUpdated() {
    const card = this.shadowRoot?.getElementById("dynamic-card");

    if (!card) {
      console.error("Could not find the card");
      return;
    }

    const updatePadding = () => {
      const top = Math.floor(Math.random() * 7) * 5;
      const bottom = 60 - top;

      const left = Math.floor(Math.random() * 7) * 5;
      const right = 60 - left;

      card.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
    };

    // Aggiorna il margine ogni 30 secondi
    setInterval(updatePadding, 30000);

    // Imposta il margine iniziale
    updatePadding();
  }

  setConfig(config: any) {
    if (!config.entity) {
      throw new Error("Invalid configuration");
    }
    this.config = config;
  }

  getCardSize() {
    return 15;
  }

  private async subscribeToHourlyForecast() {
    this.unsubscribeHourlyForecast();
    if (
      !this.isConnected ||
      !this.hass ||
      !this.config ||
      !this.config.entity ||
      !this.hassSupportsForecastEvents() ||
      !this.config.entity.startsWith("weather.")
    ) {
      return;
    }

    this.subscribedToHourlyForecast = this.hass.connection.subscribeMessage(
      (evt: any) => (this.hourlyForecastEvent = evt),
      {
        type: "weather/subscribe_forecast",
        forecast_type: "hourly",
        entity_id: this.config.entity,
      }
    );
  }

  private unsubscribeHourlyForecast() {
    if (this.subscribedToHourlyForecast) {
      this.subscribedToHourlyForecast.then((unsub) => unsub());
      this.subscribedToHourlyForecast = undefined;
    }
  }

  private hassSupportsForecastEvents(): boolean {
    return !!this.hass?.services?.weather?.get_forecasts;
  }

  private getHourlyForecast() {
    const forecast = this.hourlyForecastEvent?.forecast;
    return forecast ?? [];
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.subscribeToHourlyForecast();
    this.getCalendars(); // Ottieni l'elenco dei calendari
    this.getEvents(); // Richiama la funzione per recuperare gli eventi
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeHourlyForecast();
  }

  private renderEntityState(): TemplateResult {
    if (!this.config?.value_entity) return html``;

    const valueEntities = this.config.value_entity;

    return html`
      <div id="entityState" class="icon-state-div-class">
        ${valueEntities.length > 0
          ? valueEntities.map((entityId: string) => {
              const entityState = this.hass.states[entityId];
              if (!entityState) {
                return html`<div>Entità non trovata: ${entityId}</div>`;
              }
              const friendlyName =
                entityState.attributes.friendly_name || entityId;
              const state = entityState.state;
              const unit = entityState.attributes.unit_of_measurement || "";

              return html`
                <div class="entity">
                  <span class="friendly-name">${friendlyName}</span>
                  <div class="value">
                    <span class="state">${state}</span>
                    <span class="unit">${unit}</span>
                  </div>
                </div>
              `;
            })
          : html`<div>Nessuna entità configurata</div>`}
      </div>
    `;
  }

  private renderEvents(): TemplateResult {
    if (!this.config?.calendars) return html``;

    return html`
      <div class="events">
        ${this.events.length > 0
          ? this.events.map(
              (event: any) => html`
                <div class="event">
                  <div class="event-title">${event.summary}</div>
                  <div class="event-time">
                    ${this.formatEventDate(event.start)} -
                    ${this.formatEventDate(event.end)}
                  </div>
                </div>
              `
            )
          : html``}
      </div>
    `;
  }

  render(): TemplateResult {
    const hourlyForecast = this.getHourlyForecast();
    const limitedForecast = hourlyForecast.slice(0, 16); // Prendi i primi 12 elementi
    let previousCondition = ""; // Variabile per tenere traccia della condizione precedente
    const currentHour = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    // Ottieni la lingua configurata in Home Assistant o usa 'en-US' come fallback
    const language = this.hass?.locale?.language || "en-US";

    // Ottieni i componenti della data
    const now = new Date();
    const dayName = now.toLocaleDateString(language, { weekday: "short" }); // Giorno della settimana
    const day = now.toLocaleDateString(language, { day: "2-digit" }); // Giorno
    const month = now.toLocaleDateString(language, { month: "2-digit" }); // Mese
    const year = now.toLocaleDateString(language, { year: "2-digit" }); // Anno

    // Combina i componenti con il separatore ` : `
    const formattedDate = `${dayName} : ${day} : ${month} : ${year}`;
    const entityIcons = this.config?.entity_icon || [];
    const valueEntities = this.config?.value_entity || [];

    const weatherEntity = this.config?.entity;

    // Verifica che l'entità di stato del meteo e del sole siano valide
    if (!weatherEntity || !this.hass.states[weatherEntity]) {
      console.error("Invalid or not found weather entity:", weatherEntity);
      return html``;
    }

    const weatherState = this.hass.states[weatherEntity].state; // Stato attuale del meteo
    const weatherTemperature =
      this.hass.states[weatherEntity].attributes.temperature;
    const sunEntity = this.hass.states["sun.sun"];
    if (!sunEntity) {
      console.error("Entità sun.sun non trovata");
      return html``;
    }

    // Determina se è giorno o notte
    const isday = sunEntity?.state === "above_horizon";

    // Determina l'icona del meteo
    let nowWeatherIcon;
    if (weatherState === "partlycloudy") { 
      nowWeatherIcon = isday ? "partlycloudy" : "partlycloudy-night"; // Usa isday per determinare l'icona
    } else {
      nowWeatherIcon = weatherState; // Per tutti gli altri stati
    }

    const shouldAlternate = this.config?.value_entity && this.config?.calendars;
    const showEntityState = Math.floor((Date.now() / 7000) % 2) === 0;

    return html`
      <ha-card id="dynamic-card" style="padding: 30px;">
        <div class="main-grid">
          ${this.cg_alert ? html` <div class="cg-alert"></div> ` : ""}
          <div id="icon-state-div" class="icon-state-div-class">
            ${entityIcons.length > 0
              ? entityIcons.map((entityConfig: any) => {
                  // Estrai l'ID dell'entità e l'icona personalizzata
                  const entityId = entityConfig.entity;
                  const customIcon = entityConfig.icon;

                  // Ottieni lo stato dell'entità da Home Assistant
                  const entityState = this.hass.states[entityId];

                  // Controlla se l'entità esiste e il suo stato è "on"
                  if (!entityState || entityState.state !== "on") {
                    return ""; // Non renderizzare nulla se l'entità non è "on"
                  }

                  // Usa l'icona configurata oppure quella predefinita di Home Assistant
                  const icon = customIcon || entityState.attributes.icon;

                  return html`
                    <ha-icon
                      .icon="${icon}"
                      style="margin: 0 8px; font-size: 24px;"
                      title="${entityState.attributes.friendly_name ||
                      entityId}"
                    ></ha-icon>
                  `;
                })
              : html`<div>No entities configured or active</div>`}
          </div>

          <div id="date-time">
            <div class="time">
              ${currentHour}
              <div class="date">
                <div>${dayName}</div>
                <div>:</div>
                <div>${day}</div>
                <div>:</div>
                <div>${month}</div>
                <div>:</div>
                <div>${year}</div>
              </div>
            </div>
            <!--    <div class="date">${formattedDate}</div> -->
          </div>

          <div class="now-icon">
            <img
              src="https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/now_icon/${nowWeatherIcon}.svg"
            />
          </div>

          <div class="div-temp">
            ${this.config?.internal_temperature
              ? (() => {
                  // Calcola internalTemperatureState se internal_temperature è configurato
                  const internalTemperature =
                    this.config?.internal_temperature || "";
                  const internalTemperatureState =
                    internalTemperature && this.hass.states[internalTemperature]
                      ? this.hass.states[internalTemperature].state
                      : null; // Valore predefinito se non è definito o non esiste

                  // Ritorna l'SVG con il valore calcolato
                  return html`
                    <svg
                      version="1.1"
                      id="Ñëîé_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 1152.78 354.73"
                      style="enable-background:new 0 0 1152.78 354.73; height:6vh;"
                      xml:space="preserve"
                    >
                      <style type="text/css">
                        .st0 {
                          fill: #757575;
                        }
                        .st1 {
                          font-family: "bw_font";
                          font-weight: bold;
                        }
                        .st2 {
                          font-size: 180px;
                        }
                      </style>
                      <g>
                        <path
                          class="st0"
                          d="M1134.59,158.27c1.24,1.14,1.56,2.51,0.97,4.07c-0.56,1.48-2.01,2.44-3.59,2.44h-29.34
  c-16.57,0-30,13.43-30,30v24.55c0,4.16,3.37,7.52,7.52,7.52l0,0c4.16,0,7.52-3.37,7.52-7.52v-24.55c0-8.25,6.69-14.94,14.94-14.94
  h29.43c17.14,0,25.35-21.04,12.74-32.65L853.18,8.75c-3.6-3.31-8.16-4.96-12.73-4.96c-4.57,0-9.14,1.65-12.74,4.97L555.94,147.19
  c-12.6,11.61-4.39,32.65,12.74,32.65h33.18c8.25,0,14.94,6.69,14.94,14.94v138.86c0,8.47,8.83,15.24,17.26,15.24h69.4
  c4.16,0,7.52-3.37,7.52-7.52l0,0c0-4.16-3.37-7.52-7.52-7.52h-69.4c-0.68,0-1.7-0.52-2.21-0.99V194.78c0-16.57-13.43-30-30-30
  h-33.09c-1.59,0-3.04-0.96-3.6-2.44c-0.59-1.56-0.25-2.93,0.98-4.07L837.9,19.83c0.89-0.82,1.88-0.99,2.55-0.99
  c0.67,0,1.65,0.17,2.54,0.99"
                        />
                      </g>
                      <text
                        transform="matrix(1 0 0 1 0.1313 290.461)" 
                        class="st0 st1 st2"
                      >
                        ${weatherTemperature}°
                      </text>
                      <text
                        transform="matrix(1 0 0 1 660.559 290.461)"
                        class="st0 st1 st2"
                      >
                        ${internalTemperatureState}°
                      </text>
                    </svg>
                  `;
                })()
              : html`<div class="ext-temp">${weatherTemperature}°</div>`}
          </div>

          ${shouldAlternate
            ? html`
                <div
                  style="grid-area: cal-event;align-self: end;"
                  class="${showEntityState ? "visible" : "hidden"}"
                >
                  ${showEntityState ? this.renderEntityState() : ""}
                </div>
                <div
                  style="grid-area: cal-event;align-self: end;"
                  class="${!showEntityState ? "visible" : "hidden"}"
                >
                  ${!showEntityState ? this.renderEvents() : ""}
                </div>
              `
            : html`
                ${this.config?.value_entity
                  ? html`<div style="grid-area: cal-event;align-self: end;">
                      ${this.renderEntityState()}
                    </div>`
                  : ""}
                ${this.config?.calendars
                  ? html`<div style="grid-area: cal-event;align-self: end;">
                      ${this.renderEvents()}
                    </div>`
                  : ""}
              `}

          <div style="grid-area: tline; margin-top: 7vh;">
            <div class="gradient-bar"></div>
            <div class="timeline">
              ${limitedForecast.length > 0
                ? limitedForecast.map((f: any, index: number) => {
                    const showCondition = f.condition !== previousCondition;
                    previousCondition = f.condition; // Aggiorna la condizione precedente

                    const icon =
                    ScreensaverCard.weatherIconsDay[f.condition as keyof typeof ScreensaverCard.weatherIconsDay] || "unknown";
                    const iconUrl = `https://raw.githubusercontent.com/madmicio/screensaver-card/main/icons/${icon}.svg`;

                    const temperatureClass =
                      f.temperature < 10
                        ? "cold"
                        : f.temperature > 25
                          ? "hot"
                          : "";

                    return html`
                      <div class="timeline-item">
                        ${showCondition
                          ? html`
                              <div class="condition">
                                <img src="${iconUrl}" alt="${f.condition}" />
                              </div>
                            `
                          : html`<div class="condition"></div>`}
                        <div class="details">
                          <div class="hour">
                            ${new Date(f.datetime).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                          <div class="temperature ${temperatureClass}">
                            ${f.temperature}°C
                          </div>
                          ${f.precipitation !== 0
                            ? html`<div class="precipitation">
                                ${f.precipitation} mm
                              </div>`
                            : ""}
                        </div>
                      </div>
                    `;
                  })
                : html`<div>No hourly forecast available</div>`}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }
}