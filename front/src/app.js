const width = 1000;
const height = 550;
const API_URL = "http://127.0.0.1:8000/data";
const FALLBACK_DATA = {"dates":["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04","2026-05","2026-06","2026-07","2026-08"],"themes":["Politics","Economy","Sports","Entertainement","Artificial Intelligence","Quantum"],"points":[{"name":"Paris","lon":2.3522,"lat":48.8566,"themes":{"Politics":{"2025-01":18,"2025-02":22,"2025-03":24,"2025-04":26,"2025-05":30,"2025-06":28,"2025-07":25,"2025-08":23,"2025-09":27,"2025-10":31,"2025-11":33,"2025-12":36,"2026-01":35,"2026-02":50,"2026-03":45,"2026-04":90,"2026-05":62,"2026-06":48,"2026-07":40,"2026-08":58},"Economy":{"2025-01":12,"2025-02":14,"2025-03":16,"2025-04":18,"2025-05":22,"2025-06":24,"2025-07":21,"2025-08":20,"2025-09":23,"2025-10":24,"2025-11":26,"2025-12":28,"2026-01":20,"2026-02":30,"2026-03":22,"2026-04":55,"2026-05":42,"2026-06":38,"2026-07":34,"2026-08":46},"Sports":{"2025-01":10,"2025-02":12,"2025-03":14,"2025-04":20,"2025-05":26,"2025-06":29,"2025-07":34,"2025-08":32,"2025-09":22,"2025-10":18,"2025-11":16,"2025-12":14,"2026-01":15,"2026-02":18,"2026-03":20,"2026-04":48,"2026-05":58,"2026-06":44,"2026-07":60,"2026-08":36},"Entertainement":{"2025-01":8,"2025-02":10,"2025-03":12,"2025-04":13,"2025-05":16,"2025-06":18,"2025-07":21,"2025-08":20,"2025-09":18,"2025-10":17,"2025-11":15,"2025-12":14,"2026-01":10,"2026-02":22,"2026-03":13,"2026-04":35,"2026-05":30,"2026-06":34,"2026-07":42,"2026-08":31},"Artificial Intelligence":{"2025-01":5,"2025-02":6,"2025-03":8,"2025-04":9,"2025-05":11,"2025-06":13,"2025-07":14,"2025-08":16,"2025-09":18,"2025-10":20,"2025-11":23,"2025-12":26,"2026-01":10,"2026-02":22,"2026-03":13,"2026-04":35,"2026-05":44,"2026-06":50,"2026-07":57,"2026-08":61},"Quantum":{"2025-01":1,"2025-02":1,"2025-03":2,"2025-04":2,"2025-05":3,"2025-06":3,"2025-07":4,"2025-08":4,"2025-09":5,"2025-10":6,"2025-11":7,"2025-12":8,"2026-01":9,"2026-02":11,"2026-03":14,"2026-04":18,"2026-05":22,"2026-06":27,"2026-07":31,"2026-08":35}}},{"name":"New York","lon":-74.006,"lat":40.7128,"themes":{"Politics":{"2025-01":14,"2025-02":15,"2025-03":17,"2025-04":18,"2025-05":19,"2025-06":22,"2025-07":20,"2025-08":19,"2025-09":21,"2025-10":24,"2025-11":26,"2025-12":29,"2026-01":18,"2026-02":24,"2026-03":32,"2026-04":12,"2026-05":38,"2026-06":35,"2026-07":29,"2026-08":33},"Economy":{"2025-01":16,"2025-02":18,"2025-03":20,"2025-04":23,"2025-05":26,"2025-06":28,"2025-07":30,"2025-08":31,"2025-09":34,"2025-10":36,"2025-11":38,"2025-12":41,"2026-01":20,"2026-02":28,"2026-03":42,"2026-04":14,"2026-05":48,"2026-06":52,"2026-07":46,"2026-08":43},"Sports":{"2025-01":9,"2025-02":10,"2025-03":12,"2025-04":16,"2025-05":20,"2025-06":24,"2025-07":28,"2025-08":30,"2025-09":26,"2025-10":22,"2025-11":18,"2025-12":15,"2026-01":12,"2026-02":16,"2026-03":36,"2026-04":10,"2026-05":34,"2026-06":41,"2026-07":50,"2026-08":39},"Entertainement":{"2025-01":11,"2025-02":12,"2025-03":13,"2025-04":16,"2025-05":18,"2025-06":20,"2025-07":23,"2025-08":24,"2025-09":22,"2025-10":21,"2025-11":20,"2025-12":19,"2026-01":10,"2026-02":22,"2026-03":30,"2026-04":14,"2026-05":32,"2026-06":36,"2026-07":40,"2026-08":38},"Artificial Intelligence":{"2025-01":7,"2025-02":8,"2025-03":10,"2025-04":12,"2025-05":14,"2025-06":16,"2025-07":18,"2025-08":21,"2025-09":24,"2025-10":27,"2025-11":31,"2025-12":34,"2026-01":10,"2026-02":22,"2026-03":13,"2026-04":35,"2026-05":46,"2026-06":55,"2026-07":59,"2026-08":63},"Quantum":{"2025-01":1,"2025-02":2,"2025-03":2,"2025-04":3,"2025-05":4,"2025-06":5,"2025-07":6,"2025-08":7,"2025-09":8,"2025-10":10,"2025-11":12,"2025-12":14,"2026-01":16,"2026-02":19,"2026-03":23,"2026-04":28,"2026-05":34,"2026-06":40,"2026-07":46,"2026-08":52}}},{"name":"Tokyo","lon":139.6917,"lat":35.6895,"themes":{"Politics":{"2025-01":20,"2025-02":18,"2025-03":19,"2025-04":21,"2025-05":23,"2025-06":24,"2025-07":22,"2025-08":21,"2025-09":22,"2025-10":24,"2025-11":25,"2025-12":27,"2026-01":28,"2026-02":14,"2026-03":32,"2026-04":25,"2026-05":26,"2026-06":28,"2026-07":24,"2026-08":27},"Economy":{"2025-01":18,"2025-02":19,"2025-03":20,"2025-04":22,"2025-05":24,"2025-06":26,"2025-07":27,"2025-08":28,"2025-09":29,"2025-10":30,"2025-11":31,"2025-12":33,"2026-01":26,"2026-02":18,"2026-03":34,"2026-04":28,"2026-05":36,"2026-06":39,"2026-07":35,"2026-08":37},"Sports":{"2025-01":16,"2025-02":17,"2025-03":19,"2025-04":22,"2025-05":26,"2025-06":28,"2025-07":32,"2025-08":35,"2025-09":31,"2025-10":27,"2025-11":23,"2025-12":21,"2026-01":24,"2026-02":16,"2026-03":46,"2026-04":39,"2026-05":44,"2026-06":49,"2026-07":52,"2026-08":47},"Entertainement":{"2025-01":14,"2025-02":15,"2025-03":16,"2025-04":18,"2025-05":20,"2025-06":21,"2025-07":23,"2025-08":25,"2025-09":24,"2025-10":23,"2025-11":22,"2025-12":21,"2026-01":22,"2026-02":22,"2026-03":38,"2026-04":38,"2026-05":35,"2026-06":40,"2026-07":42,"2026-08":39},"Artificial Intelligence":{"2025-01":8,"2025-02":9,"2025-03":10,"2025-04":12,"2025-05":14,"2025-06":16,"2025-07":18,"2025-08":20,"2025-09":23,"2025-10":26,"2025-11":29,"2025-12":32,"2026-01":10,"2026-02":22,"2026-03":13,"2026-04":35,"2026-05":48,"2026-06":54,"2026-07":60,"2026-08":66},"Quantum":{"2025-01":1,"2025-02":1,"2025-03":2,"2025-04":2,"2025-05":3,"2025-06":4,"2025-07":5,"2025-08":6,"2025-09":8,"2025-10":10,"2025-11":12,"2025-12":14,"2026-01":16,"2026-02":20,"2026-03":25,"2026-04":31,"2026-05":38,"2026-06":44,"2026-07":49,"2026-08":54}}},{"name":"Rome","lon":12.4964,"lat":41.9028,"themes":{"Politics":{"2025-01":15,"2025-02":17,"2025-03":18,"2025-04":19,"2025-05":22,"2025-06":24,"2025-07":21,"2025-08":20,"2025-09":22,"2025-10":23,"2025-11":24,"2025-12":25,"2026-01":24,"2026-02":29,"2026-03":33,"2026-04":41,"2026-05":36,"2026-06":31,"2026-07":28,"2026-08":30},"Economy":{"2025-01":10,"2025-02":12,"2025-03":13,"2025-04":14,"2025-05":16,"2025-06":17,"2025-07":18,"2025-08":17,"2025-09":18,"2025-10":19,"2025-11":20,"2025-12":21,"2026-01":16,"2026-02":20,"2026-03":24,"2026-04":32,"2026-05":27,"2026-06":25,"2026-07":22,"2026-08":24},"Sports":{"2025-01":12,"2025-02":13,"2025-03":15,"2025-04":18,"2025-05":22,"2025-06":24,"2025-07":28,"2025-08":29,"2025-09":24,"2025-10":20,"2025-11":17,"2025-12":15,"2026-01":20,"2026-02":23,"2026-03":31,"2026-04":37,"2026-05":42,"2026-06":46,"2026-07":51,"2026-08":40},"Entertainement":{"2025-01":9,"2025-02":10,"2025-03":11,"2025-04":12,"2025-05":14,"2025-06":15,"2025-07":17,"2025-08":18,"2025-09":17,"2025-10":16,"2025-11":15,"2025-12":14,"2026-01":14,"2026-02":18,"2026-03":20,"2026-04":26,"2026-05":29,"2026-06":33,"2026-07":36,"2026-08":32},"Artificial Intelligence":{"2025-01":4,"2025-02":5,"2025-03":6,"2025-04":7,"2025-05":8,"2025-06":10,"2025-07":11,"2025-08":12,"2025-09":13,"2025-10":14,"2025-11":15,"2025-12":17,"2026-01":8,"2026-02":12,"2026-03":16,"2026-04":22,"2026-05":28,"2026-06":35,"2026-07":39,"2026-08":43},"Quantum":{"2025-01":0,"2025-02":0,"2025-03":1,"2025-04":1,"2025-05":1,"2025-06":2,"2025-07":2,"2025-08":3,"2025-09":3,"2025-10":4,"2025-11":5,"2025-12":6,"2026-01":7,"2026-02":8,"2026-03":10,"2026-04":13,"2026-05":16,"2026-06":20,"2026-07":23,"2026-08":26}}},{"name":"India","lon":78.9629,"lat":20.5937,"themes":{"Politics":{"2025-01":20,"2025-02":22,"2025-03":24,"2025-04":26,"2025-05":28,"2025-06":30,"2025-07":31,"2025-08":29,"2025-09":30,"2025-10":31,"2025-11":32,"2025-12":34,"2026-01":32,"2026-02":35,"2026-03":39,"2026-04":44,"2026-05":41,"2026-06":38,"2026-07":36,"2026-08":40},"Economy":{"2025-01":18,"2025-02":19,"2025-03":21,"2025-04":23,"2025-05":25,"2025-06":27,"2025-07":29,"2025-08":30,"2025-09":31,"2025-10":32,"2025-11":33,"2025-12":35,"2026-01":28,"2026-02":31,"2026-03":35,"2026-04":39,"2026-05":42,"2026-06":46,"2026-07":48,"2026-08":50},"Sports":{"2025-01":14,"2025-02":16,"2025-03":18,"2025-04":22,"2025-05":26,"2025-06":30,"2025-07":34,"2025-08":36,"2025-09":38,"2025-10":36,"2025-11":32,"2025-12":28,"2026-01":26,"2026-02":30,"2026-03":41,"2026-04":45,"2026-05":52,"2026-06":56,"2026-07":60,"2026-08":58},"Entertainement":{"2025-01":12,"2025-02":13,"2025-03":15,"2025-04":17,"2025-05":19,"2025-06":21,"2025-07":22,"2025-08":24,"2025-09":25,"2025-10":26,"2025-11":27,"2025-12":28,"2026-01":22,"2026-02":25,"2026-03":29,"2026-04":34,"2026-05":38,"2026-06":40,"2026-07":43,"2026-08":45},"Artificial Intelligence":{"2025-01":9,"2025-02":10,"2025-03":12,"2025-04":14,"2025-05":16,"2025-06":18,"2025-07":20,"2025-08":22,"2025-09":24,"2025-10":26,"2025-11":28,"2025-12":30,"2026-01":18,"2026-02":22,"2026-03":27,"2026-04":33,"2026-05":40,"2026-06":47,"2026-07":55,"2026-08":62},"Quantum":{"2025-01":1,"2025-02":1,"2025-03":2,"2025-04":2,"2025-05":3,"2025-06":4,"2025-07":5,"2025-08":6,"2025-09":8,"2025-10":10,"2025-11":13,"2025-12":16,"2026-01":20,"2026-02":24,"2026-03":29,"2026-04":35,"2026-05":42,"2026-06":50,"2026-07":58,"2026-08":66}}},{"name":"Brazil","lon":-51.9253,"lat":-14.235,"themes":{"Politics":{"2025-01":14,"2025-02":16,"2025-03":18,"2025-04":19,"2025-05":20,"2025-06":21,"2025-07":22,"2025-08":21,"2025-09":22,"2025-10":23,"2025-11":24,"2025-12":25,"2026-01":22,"2026-02":26,"2026-03":30,"2026-04":35,"2026-05":31,"2026-06":29,"2026-07":27,"2026-08":34},"Economy":{"2025-01":11,"2025-02":12,"2025-03":14,"2025-04":15,"2025-05":17,"2025-06":18,"2025-07":20,"2025-08":21,"2025-09":22,"2025-10":23,"2025-11":24,"2025-12":25,"2026-01":18,"2026-02":21,"2026-03":26,"2026-04":29,"2026-05":33,"2026-06":36,"2026-07":34,"2026-08":38},"Sports":{"2025-01":20,"2025-02":22,"2025-03":24,"2025-04":28,"2025-05":32,"2025-06":36,"2025-07":40,"2025-08":42,"2025-09":39,"2025-10":35,"2025-11":31,"2025-12":27,"2026-01":30,"2026-02":36,"2026-03":44,"2026-04":50,"2026-05":56,"2026-06":58,"2026-07":62,"2026-08":54},"Entertainement":{"2025-01":11,"2025-02":12,"2025-03":14,"2025-04":16,"2025-05":18,"2025-06":20,"2025-07":22,"2025-08":23,"2025-09":22,"2025-10":21,"2025-11":20,"2025-12":19,"2026-01":18,"2026-02":22,"2026-03":28,"2026-04":31,"2026-05":35,"2026-06":37,"2026-07":40,"2026-08":42},"Artificial Intelligence":{"2025-01":4,"2025-02":5,"2025-03":6,"2025-04":7,"2025-05":8,"2025-06":9,"2025-07":10,"2025-08":11,"2025-09":12,"2025-10":13,"2025-11":14,"2025-12":16,"2026-01":9,"2026-02":13,"2026-03":18,"2026-04":24,"2026-05":28,"2026-06":34,"2026-07":39,"2026-08":44},"Quantum":{"2025-01":0,"2025-02":0,"2025-03":1,"2025-04":1,"2025-05":1,"2025-06":2,"2025-07":2,"2025-08":3,"2025-09":4,"2025-10":5,"2025-11":6,"2025-12":7,"2026-01":8,"2026-02":10,"2026-03":12,"2026-04":15,"2026-05":18,"2026-06":22,"2026-07":25,"2026-08":28}}},{"name":"San Francisco","lon":-122.4194,"lat":37.7749,"themes":{"Politics":{"2025-01":13,"2025-02":14,"2025-03":15,"2025-04":16,"2025-05":18,"2025-06":19,"2025-07":18,"2025-08":17,"2025-09":19,"2025-10":20,"2025-11":21,"2025-12":22,"2026-01":20,"2026-02":24,"2026-03":27,"2026-04":21,"2026-05":26,"2026-06":24,"2026-07":22,"2026-08":23},"Economy":{"2025-01":19,"2025-02":21,"2025-03":23,"2025-04":25,"2025-05":28,"2025-06":31,"2025-07":32,"2025-08":33,"2025-09":35,"2025-10":37,"2025-11":39,"2025-12":42,"2026-01":30,"2026-02":35,"2026-03":44,"2026-04":39,"2026-05":46,"2026-06":49,"2026-07":47,"2026-08":45},"Sports":{"2025-01":8,"2025-02":9,"2025-03":10,"2025-04":12,"2025-05":15,"2025-06":17,"2025-07":19,"2025-08":18,"2025-09":16,"2025-10":14,"2025-11":12,"2025-12":11,"2026-01":11,"2026-02":14,"2026-03":18,"2026-04":13,"2026-05":20,"2026-06":22,"2026-07":24,"2026-08":19},"Entertainement":{"2025-01":12,"2025-02":13,"2025-03":14,"2025-04":15,"2025-05":17,"2025-06":18,"2025-07":20,"2025-08":22,"2025-09":21,"2025-10":20,"2025-11":19,"2025-12":18,"2026-01":16,"2026-02":19,"2026-03":24,"2026-04":20,"2026-05":23,"2026-06":26,"2026-07":28,"2026-08":25},"Artificial Intelligence":{"2025-01":22,"2025-02":24,"2025-03":27,"2025-04":29,"2025-05":33,"2025-06":36,"2025-07":39,"2025-08":41,"2025-09":44,"2025-10":47,"2025-11":51,"2025-12":55,"2026-01":40,"2026-02":46,"2026-03":52,"2026-04":58,"2026-05":64,"2026-06":68,"2026-07":72,"2026-08":75},"Quantum":{"2025-01":2,"2025-02":3,"2025-03":4,"2025-04":5,"2025-05":7,"2025-06":9,"2025-07":11,"2025-08":14,"2025-09":17,"2025-10":21,"2025-11":26,"2025-12":31,"2026-01":36,"2026-02":42,"2026-03":49,"2026-04":57,"2026-05":64,"2026-06":70,"2026-07":75,"2026-08":80}}},{"name":"Perth","lon":115.8605,"lat":-31.9505,"themes":{"Politics":{"2025-01":10,"2025-02":11,"2025-03":12,"2025-04":13,"2025-05":14,"2025-06":15,"2025-07":14,"2025-08":13,"2025-09":14,"2025-10":15,"2025-11":16,"2025-12":17,"2026-01":15,"2026-02":17,"2026-03":19,"2026-04":21,"2026-05":20,"2026-06":18,"2026-07":17,"2026-08":19},"Economy":{"2025-01":12,"2025-02":13,"2025-03":15,"2025-04":16,"2025-05":18,"2025-06":19,"2025-07":20,"2025-08":21,"2025-09":22,"2025-10":23,"2025-11":24,"2025-12":26,"2026-01":18,"2026-02":20,"2026-03":24,"2026-04":27,"2026-05":29,"2026-06":31,"2026-07":30,"2026-08":28},"Sports":{"2025-01":15,"2025-02":16,"2025-03":18,"2025-04":20,"2025-05":22,"2025-06":24,"2025-07":28,"2025-08":30,"2025-09":26,"2025-10":22,"2025-11":20,"2025-12":18,"2026-01":19,"2026-02":21,"2026-03":27,"2026-04":30,"2026-05":33,"2026-06":36,"2026-07":38,"2026-08":34},"Entertainement":{"2025-01":9,"2025-02":10,"2025-03":11,"2025-04":12,"2025-05":13,"2025-06":14,"2025-07":15,"2025-08":16,"2025-09":15,"2025-10":14,"2025-11":13,"2025-12":12,"2026-01":11,"2026-02":13,"2026-03":16,"2026-04":18,"2026-05":20,"2026-06":22,"2026-07":24,"2026-08":21},"Artificial Intelligence":{"2025-01":7,"2025-02":8,"2025-03":9,"2025-04":10,"2025-05":12,"2025-06":13,"2025-07":15,"2025-08":16,"2025-09":18,"2025-10":19,"2025-11":21,"2025-12":23,"2026-01":16,"2026-02":18,"2026-03":22,"2026-04":26,"2026-05":30,"2026-06":33,"2026-07":36,"2026-08":39},"Quantum":{"2025-01":0,"2025-02":1,"2025-03":1,"2025-04":1,"2025-05":2,"2025-06":2,"2025-07":3,"2025-08":4,"2025-09":5,"2025-10":6,"2025-11":7,"2025-12":8,"2026-01":10,"2026-02":12,"2026-03":15,"2026-04":19,"2026-05":24,"2026-06":29,"2026-07":33,"2026-08":37}}},{"name":"Johannesburg","lon":28.0473,"lat":-26.2041,"themes":{"Politics":{"2025-01":16,"2025-02":17,"2025-03":18,"2025-04":19,"2025-05":21,"2025-06":22,"2025-07":21,"2025-08":20,"2025-09":22,"2025-10":24,"2025-11":25,"2025-12":27,"2026-01":24,"2026-02":27,"2026-03":31,"2026-04":34,"2026-05":32,"2026-06":29,"2026-07":27,"2026-08":30},"Economy":{"2025-01":13,"2025-02":14,"2025-03":15,"2025-04":17,"2025-05":18,"2025-06":19,"2025-07":20,"2025-08":21,"2025-09":22,"2025-10":24,"2025-11":25,"2025-12":27,"2026-01":19,"2026-02":22,"2026-03":26,"2026-04":29,"2026-05":31,"2026-06":33,"2026-07":32,"2026-08":34},"Sports":{"2025-01":17,"2025-02":18,"2025-03":20,"2025-04":23,"2025-05":26,"2025-06":29,"2025-07":33,"2025-08":34,"2025-09":30,"2025-10":27,"2025-11":24,"2025-12":22,"2026-01":21,"2026-02":24,"2026-03":29,"2026-04":33,"2026-05":37,"2026-06":40,"2026-07":43,"2026-08":39},"Entertainement":{"2025-01":10,"2025-02":11,"2025-03":12,"2025-04":13,"2025-05":14,"2025-06":15,"2025-07":17,"2025-08":18,"2025-09":17,"2025-10":16,"2025-11":15,"2025-12":14,"2026-01":14,"2026-02":16,"2026-03":20,"2026-04":23,"2026-05":26,"2026-06":28,"2026-07":30,"2026-08":27},"Artificial Intelligence":{"2025-01":6,"2025-02":7,"2025-03":8,"2025-04":9,"2025-05":10,"2025-06":11,"2025-07":13,"2025-08":14,"2025-09":15,"2025-10":17,"2025-11":18,"2025-12":20,"2026-01":12,"2026-02":15,"2026-03":19,"2026-04":23,"2026-05":27,"2026-06":30,"2026-07":34,"2026-08":37},"Quantum":{"2025-01":0,"2025-02":0,"2025-03":1,"2025-04":1,"2025-05":2,"2025-06":2,"2025-07":3,"2025-08":4,"2025-09":5,"2025-10":6,"2025-11":7,"2025-12":8,"2026-01":10,"2026-02":12,"2026-03":15,"2026-04":18,"2026-05":22,"2026-06":26,"2026-07":30,"2026-08":34}}}]};

let dates = [];
let themes = [];
let points = [];

const themeColors = {
  Politics: "#f4a6a6",
  Economy: "#9dc7f7",
  Sports: "#9ad8b4",
  Entertainement: "#d6b3f7",
  "Artificial Intelligence": "#fff4b8",
  Quantum: "#6a93b0",
};

const fallbackPalette = ["#f9c7c7", "#bdd7fb", "#b8e7cd", "#e3cbfb", "#ffe4b8", "#cce7ef"];

const DONUT_OUTER_RADIUS = 22;
const DONUT_INNER_RATIO = 0.52;

const svg = d3
  .select("#map")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("width", width)
  .attr("height", height);

const g = svg.append("g");

const projection = d3
  .geoNaturalEarth1()
  .scale(180)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

const cityFilters = document.getElementById("cityFilters");
const themeFilters = document.getElementById("themeFilters");
const selectAllCitiesBtn = document.getElementById("selectAllCitiesBtn");
const selectAllThemesBtn = document.getElementById("selectAllThemesBtn");
const clearAllCitiesBtn = document.getElementById("clearAllCitiesBtn");
const clearAllThemesBtn = document.getElementById("clearAllThemesBtn");
const slider = document.getElementById("timeSlider");
const speedSlider = document.getElementById("speedSlider");
const timeLabel = document.getElementById("timeLabel");
const playButton = document.getElementById("playButton");
const themeLegend = document.getElementById("themeLegend");
const downloadDataLink = document.getElementById("downloadDataLink");

const collapsiblePanels = [
  {
    panel: document.getElementById("themePanel"),
    button: document.getElementById("toggleThemesBtn"),
  },
  {
    panel: document.getElementById("cityPanel"),
    button: document.getElementById("toggleCitiesBtn"),
  },
];

let playbackInterval = null;
let currentZoomScale = 1;
let playbackDelay = 500;
let usingFallbackData = false;

const pie = d3
  .pie()
  .sort(null)
  .value(d => d.value);

const zoomBehavior = d3
  .zoom()
  .scaleExtent([1, 8])
  .translateExtent([[-width, -height], [width * 2, height * 2]])
  .on("start", () => {
    svg.classed("is-dragging", true);
  })
  .on("zoom", event => {
    currentZoomScale = event.transform.k;
    g.attr("transform", event.transform);

    if (dates.length > 0) {
      updatePoints(dates[+slider.value]);
    }
  })
  .on("end", () => {
    svg.classed("is-dragging", false);
  });

function getThemeColor(theme, index) {
  return themeColors[theme] ?? fallbackPalette[index % fallbackPalette.length];
}

function getSelectedCities() {
  return points.filter(point => {
    const input = document.querySelector(`input[data-city="${point.name}"]`);
    return input?.checked;
  });
}

function getSelectedThemes() {
  return themes.filter(theme => {
    const input = document.querySelector(`input[data-theme="${theme}"]`);
    return input?.checked;
  });
}

function getThemeValue(point, theme, selectedDate) {
  return point.themes[theme]?.[selectedDate] ?? 0;
}

function getDonutGeometry() {
  const outerRadius = DONUT_OUTER_RADIUS / currentZoomScale;
  const innerRadius = outerRadius * DONUT_INNER_RATIO;
  return {
    innerRadius,
    arc: d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
    labelArc: d3.arc().innerRadius(innerRadius).outerRadius(outerRadius),
  };
}

function getDonutLabelFontSize() {
  return Math.max(2.5, 8 / currentZoomScale);
}

function updatePoints(selectedDate) {
  timeLabel.textContent = selectedDate;

  const selectedCities = getSelectedCities();
  const selectedThemes = getSelectedThemes();
  const { innerRadius, arc, labelArc } = getDonutGeometry();

  const donutGroups = g.selectAll(".donut")
    .data(selectedCities, d => d.name)
    .join(
      enter => enter
        .append("g")
        .attr("class", "donut")
        .each(function() {
          d3.select(this).append("circle").attr("class", "donut-hole");
          d3.select(this).append("title");
        }),
      update => update,
      exit => exit.remove()
    )
    .attr("transform", d => {
      const [x, y] = projection([d.lon, d.lat]);
      return `translate(${x}, ${y})`;
    });

  donutGroups.each(function(point) {
    const group = d3.select(this);
    const donutData = pie(
      selectedThemes.map(theme => ({
        theme,
        value: getThemeValue(point, theme, selectedDate),
      }))
    ).filter(segment => segment.data.value > 0);

    group.selectAll(".donut-slice")
      .data(donutData, d => d.data.theme)
      .join(
        enter => enter
          .append("path")
          .attr("class", "donut-slice")
          .attr("fill", d => getThemeColor(d.data.theme, themes.indexOf(d.data.theme)))
          .attr("d", arc),
        update => update
          .attr("fill", d => getThemeColor(d.data.theme, themes.indexOf(d.data.theme)))
          .attr("d", arc),
        exit => exit.remove()
      );

    group.select(".donut-hole")
      .attr("r", donutData.length > 0 ? innerRadius : 0);

    group.selectAll(".donut-label")
      .data(donutData, d => d.data.theme)
      .join(
        enter => enter
          .append("text")
          .attr("class", "donut-label")
          .attr("transform", d => `translate(${labelArc.centroid(d)})`)
          .text(d => d.data.value),
        update => update
          .attr("transform", d => `translate(${labelArc.centroid(d)})`)
          .text(d => d.data.value),
        exit => exit.remove()
      )
      .style("font-size", `${getDonutLabelFontSize()}px`)
      .style("display", d => d.data.value >= 10 ? "block" : "none");

    const breakdown = selectedThemes
      .map(theme => `${theme}: ${getThemeValue(point, theme, selectedDate)}`)
      .join(" | ");

    group.select("title")
      .text(`${point.name} - ${selectedDate} - ${breakdown}`);
  });
}

function renderFilterList(container, items, key, onChange) {
  container.innerHTML = "";

  items.forEach(item => {
    const label = document.createElement("label");
    label.className = "filter-item";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = true;
    input.dataset[key] = item;
    input.addEventListener("change", onChange);

    const text = document.createElement("span");
    text.textContent = item;

    label.append(input, text);
    container.append(label);
  });
}

function renderThemeLegend() {
  themeLegend.innerHTML = "";
  const selectedThemes = getSelectedThemes();

  if (selectedThemes.length === 0) {
    return;
  }

  const title = document.createElement("p");
  title.className = "legend-title";
  title.textContent = "Themes";
  themeLegend.append(title);

  selectedThemes.forEach((theme, index) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const swatch = document.createElement("span");
    swatch.className = "legend-swatch";
    swatch.style.backgroundColor = getThemeColor(theme, index);

    const label = document.createElement("span");
    label.textContent = theme;

    item.append(swatch, label);
    themeLegend.append(item);
  });
}

function updatePlaybackButton() {
  const isPlaying = playbackInterval !== null;
  playButton.setAttribute("aria-label", isPlaying ? "Pause timeline" : "Play timeline");
  playButton.classList.toggle("is-playing", isPlaying);
}

function stopPlayback() {
  if (playbackInterval !== null) {
    clearInterval(playbackInterval);
    playbackInterval = null;
    updatePlaybackButton();
  }
}

function showDateAtIndex(index) {
  slider.value = index;
  updatePoints(dates[index]);
}

function getPlaybackDelay() {
  const speedValue = Number(speedSlider.value);
  return 1200 - ((speedValue - 1) * 225);
}

function startPlayback() {
  if (+slider.value >= dates.length - 1) {
    showDateAtIndex(0);
  }

  playbackDelay = getPlaybackDelay();
  playbackInterval = window.setInterval(() => {
    const currentIndex = +slider.value;

    if (currentIndex >= dates.length - 1) {
      stopPlayback();
      return;
    }

    showDateAtIndex(currentIndex + 1);
  }, playbackDelay);

  updatePlaybackButton();
}

function updatePanelState(panel, button) {
  const isExpanded = panel.classList.contains("is-expanded");
  button.setAttribute("aria-expanded", String(isExpanded));
  button.querySelector(".collapse-label").textContent = isExpanded ? "Collapse" : "Expand";
}

function selectAllIn(container, attribute) {
  container.querySelectorAll(`input[data-${attribute}]`).forEach(input => {
    input.checked = true;
  });
}

function clearAllIn(container, attribute) {
  container.querySelectorAll(`input[data-${attribute}]`).forEach(input => {
    input.checked = false;
  });
}

async function loadData() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    usingFallbackData = false;
    return response.json();
  } catch (error) {
    usingFallbackData = true;
    console.warn("API unavailable, using embedded fallback data.", error);
    return FALLBACK_DATA;
  }
}

async function init() {
  try {
    const [worldData, data] = await Promise.all([
      d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"),
      loadData(),
    ]);

    dates = data.dates;
    themes = data.themes;
    points = data.points;
    downloadDataLink.href = usingFallbackData
      ? `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(FALLBACK_DATA))}`
      : API_URL;

    slider.max = dates.length - 1;
    slider.value = 0;

    svg.call(zoomBehavior);

    renderFilterList(cityFilters, points.map(point => point.name), "city", () => {
      updatePoints(dates[+slider.value]);
    });

    renderFilterList(themeFilters, themes, "theme", () => {
      renderThemeLegend();
      updatePoints(dates[+slider.value]);
    });

    renderThemeLegend();

    g.selectAll(".country")
      .data(worldData.features)
      .join("path")
      .attr("class", "country")
      .attr("d", path);

    updatePoints(dates[0]);

    slider.addEventListener("input", event => {
      updatePoints(dates[+event.target.value]);
    });

    speedSlider.addEventListener("input", () => {
      playbackDelay = getPlaybackDelay();

      if (playbackInterval !== null) {
        stopPlayback();
        startPlayback();
      }
    });

    selectAllCitiesBtn.addEventListener("click", () => {
      selectAllIn(cityFilters, "city");
      updatePoints(dates[+slider.value]);
    });

    clearAllCitiesBtn.addEventListener("click", () => {
      clearAllIn(cityFilters, "city");
      updatePoints(dates[+slider.value]);
    });

    selectAllThemesBtn.addEventListener("click", () => {
      selectAllIn(themeFilters, "theme");
      renderThemeLegend();
      updatePoints(dates[+slider.value]);
    });

    clearAllThemesBtn.addEventListener("click", () => {
      clearAllIn(themeFilters, "theme");
      renderThemeLegend();
      updatePoints(dates[+slider.value]);
    });

    playButton.addEventListener("click", () => {
      if (playbackInterval !== null) {
        stopPlayback();
        return;
      }

      startPlayback();
    });

    collapsiblePanels.forEach(({ panel, button }) => {
      button.addEventListener("click", () => {
        panel.classList.toggle("is-expanded");
        updatePanelState(panel, button);
      });

      updatePanelState(panel, button);
    });

    updatePlaybackButton();
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
}

init();
