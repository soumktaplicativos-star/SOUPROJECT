const SOU_CALENDAR_ID = "primary";

function doGet() {
  return jsonResponse({
    ok: true,
    message: "SOU Calendar webhook ativo",
  });
}

function doPost(event) {
  try {
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

    return jsonResponse({ ok: true, results });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function makeDate(dateValue, timeValue) {
  const dateParts = String(dateValue).split("-").map(Number);
  const timeParts = String(timeValue).split(":").map(Number);

  return new Date(
    dateParts[0],
    dateParts[1] - 1,
    dateParts[2],
    timeParts[0] || 9,
    timeParts[1] || 0,
    0
  );
}

function buildDescription(item) {
  const checklist = Array.isArray(item.checklist)
    ? item.checklist
        .map((step) => `${step.done ? "[x]" : "[ ]"} ${step.text}`)
        .join("\n")
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

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
