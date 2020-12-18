       // FORMAT DATE
    data.date = Date.parse(data.date);

    // // REPLACE Y/N WITH BOOLEANS
    if (data.fed != 'No') {
        data.fed = true;
      }else data.fed = false;

    if (data.watered != 'No') {
        entries.watered = true;
      }else entries.watered = false;

    if (data.cleaned != 'No') {
        entries.cleaned = true;
      }else entries.cleaned = false;

    if (data.shed != 'No') {
        data.shed = true;
      }else data.shed = false;

    // // REPLACE NULLS
    if (data.time != null) {
        data.time = data.time;
      }else careData.time = 'Not handled';

    if (data.notes != null) {
        data.notes = data.notes;
      }else data.notes = 'No notes';      