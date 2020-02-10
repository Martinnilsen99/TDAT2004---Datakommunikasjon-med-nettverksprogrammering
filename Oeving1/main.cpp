//
// Created by Martin Johannes Nilsen on 09/02/2020.
//

#include <iostream>
#include <atomic>
#include <thread>
#include <list>
#include <vector>

using namespace std;

list<int> finnPrimtallIIntervall(int endeligStartpunkt, int endeligSluttpunkt, int antTråder){
    list<int> primtallsListe;
    mutex tråd_mutex;
    vector<thread> trådListe;
    int intervallStørrelse = (int) ((endeligSluttpunkt-endeligStartpunkt)/antTråder);
    int startpunkt = endeligStartpunkt;
    int sluttpunkt = startpunkt + intervallStørrelse;
    cout << "Trådinformasjon" << endl << "---------" << endl;
    for(int tråder = 0; tråder < antTråder; tråder++){
        cout << "Tråd " << tråder + 1 << "\nStartpunkt: " << startpunkt << "\nSluttpunkt: " << sluttpunkt << endl;
        trådListe.emplace_back([&tråd_mutex, startpunkt, sluttpunkt, &primtallsListe, &tråder] {
            for(int teller = startpunkt; teller <= sluttpunkt; teller++){
                bool erPrimtall = true;
                for(int i = 2; i < teller; i++) {
                    if(teller % i == 0) {
                        erPrimtall = false;
                        break;
                    }
                }
                if(erPrimtall) {
                    tråd_mutex.lock();
                    primtallsListe.push_back(teller);
                    tråd_mutex.unlock();
                }
            }
        });
        startpunkt = sluttpunkt + 1;
        sluttpunkt = startpunkt + intervallStørrelse;
    }
    for (auto &t : trådListe) t.join();
    primtallsListe.sort();
    return primtallsListe;
}

int main() {
    list<int> res = finnPrimtallIIntervall(1,100,10);
    cout << "\nPrimtallene i det gitte intervallet: " << endl << "---------" << endl;
    for(auto const &primtall : res) {
        cout << primtall << "\n";
    }
}










