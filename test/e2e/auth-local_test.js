"use strict";

var moment = require("moment");

describe("/auth/local POST", function() {
    it("should authenticate with email and password, to obtain an access_token", function(done) {
        test.post("/users", {
            form: {
                firstName: "john",
                lastName: "doe",
                email: "jodo@compy.comp",
                password: "mylittlepony"
            }
        }, function(user) {
            test.post("/auth/local", {
                form: {
                    email: "jodo@compy.comp",
                    password: "mylittlepony"
                }
            }, function(body) {
                expect(body.user_id).to.equal(user.id);
                expect(body.access_token).to.be.a("string");
                expect(body.access_token).to.be.ok;
                expect(body.access_token_expires).to.be.ok;
                expect(body.access_token_expires).to.be.a("number");
                expect(moment(body.access_token_expires).valueOf()).to.be.above(moment().valueOf());
                done();
            });
        });
    });
});
