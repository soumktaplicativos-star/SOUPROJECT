const SOU_CALENDAR_ID = "primary";
const SOU_TIMEZONE = "America/Sao_Paulo";

function doPost(event) {
  const payload = JSON.parse(event.postData.contents || "{}");
  const calendar = CalendarApp.getCalendarById(SOU_CALENDAR_ID);
  const props = PropertiesService.getScriptProperties();
  const items = Array.isArray(payload.items) ? payload.items : [];
  const results = [];

  items.forEach((item) => {
    if (!item.id || !item.date) return;

    const start = makeDate(item.date, item.startTime || "09:00");
    const durationMs = Number(item.durationHours || 1) * 60 * 60 * 1000;
    const end = new Date(start.getTime() + durationMs);
    const title = `${item.client || "SOU"} - ${item.title || "Demanda"}`;
    const description = buildDescription(item);
    const propKey = `sou_event_${item.id}`;
    const savedEventId = props.getProperty(propKey);
    let calendarEvent = savedEventId ? calendar.getEventById(savedEventId) : null;

    if (calendarEvent) {
      calendarEvent.setTitle(title);
      calendarEvent.setTime(start, end);
      calendarEvent.setDescription(description);
    } else {
      calendarEvent = calendar.createEvent(title, start, end, {
        description,
        guests: item.ownerEmail || "",
        sendInvites: Boolean(item.ownerEmail),
      });
      props.setProperty(propKey, calendarEvent.getId());
    }

    results.push({ id: item.id, eventId: calendarEvent.getId() });
  });

  return ContentService.createTextOutput(JSON.stringify({ ok: true, results }))
    .setMimeType(ContentService.MimeType.JSON);
}

function makeDate(dateValue, timeValue) {
  const parts = String(dateValue).split("-").map(Number);
  const time = String(timeValue).split(":").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2], time[0] || 9, time[1] || 0, 0);
}

function buildDescription(item) {
  const checklist = Array.isArray(item.checklist)
    ? item.checklist.map((step) => `${step.done ? "[x]" : "[ ]"} ${step.text}`).join("\n")
    : "";

  return [
    item.description || "",
    `Cliente: ${item.client || ""}`,
    `Responsavel: ${item.ownerName || ""}`,
    `Tipo de fluxo: ${item.flowType || ""}`,
    `Etapa: ${item.stage || ""}`,
    `Prioridade do projeto: ${item.projectPriority || ""}`,
    `Prioridade da tarefa: ${item.priority || ""}`,
    `Status: ${item.status || ""}`,
    `Tempo previsto: ${item.durationHours || 1}h`,
    checklist ? `\nChecklist:\n${checklist}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
